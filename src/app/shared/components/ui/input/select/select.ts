import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  inject,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { FormValidation } from '../../../../directives/form-validation';
import { provideInputValueAccessor } from '../input';

let _uid = 0;

/** A single option after normalization, carrying its flat position in the visible list. */
interface NormalizedOption {
  /** The value patched into the form control when selected. */
  value: unknown;
  /** The text shown in the trigger and dropdown row. */
  label: string;
  disabled: boolean;
  /** Group key (only set when `groupBy` is configured). */
  group: unknown;
  /** Index into the flat, filtered list — drives keyboard navigation. */
  index: number;
}

/** Fixed row height (px) the virtual scroller assumes for every option. */
const ROW_HEIGHT = 36;
/** Max dropdown viewport height (px) — roughly seven rows. */
const VIEWPORT_HEIGHT = 252;
/** Extra rows rendered above/below the viewport so fast scrolling stays smooth. */
const OVERSCAN = 4;

/**
 * Single-select dropdown inspired by Ant Design. Accepts a plain array of
 * primitives or an array of objects (mapped via `bindValue`/`bindLabel`),
 * supports optional in-place search, grouping, a loading state for async
 * search, and a windowed virtual scroller for large datasets.
 *
 * Bridges the selected value to a `ControlValueAccessor`, so it works with both
 * `[(ngModel)]` and reactive forms.
 */
@Component({
  selector: 'l-select',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  templateUrl: './select.html',
  styleUrl: './select.scss',
  providers: [provideInputValueAccessor(() => Select)],
  hostDirectives: [{ directive: FormValidation, inputs: ['useValidation'] }],
  host: {
    '(document:pointerdown)': '_onDocumentPointerDown($event)',
  },
})
export class Select implements ControlValueAccessor {
  readonly label = input<string>('');
  readonly placeholder = input<string>('Select…');
  readonly disabled = input<boolean>(false);
  readonly id = input<string>(`l-select-${_uid++}`);

  /** Options to choose from — primitives (`string[]`/`number[]`) or objects. */
  readonly items = input<readonly unknown[]>([]);

  /** For object items: the property to use as the patched value. Unset → the whole item. */
  readonly bindValue = input<string>();
  /** For object items: the property to display. Unset → falls back to the value, then `String(item)`. */
  readonly bindLabel = input<string>();
  /** For object items: a truthy property that disables that single option. */
  readonly bindDisabled = input<string>();
  /** For object items: the property to group options by, rendered under sticky headers. */
  readonly groupBy = input<string>();

  /** Show an in-dropdown search box that filters options by label. */
  readonly searchable = input(false);
  /** Show the chevron affix on the right. */
  readonly showArrow = input(true);
  /** Replace the option list with a spinner — useful while an async `search` is in flight. */
  readonly showLoading = input(false);
  /** Render only the visible window of rows. Best for large, ungrouped lists. */
  readonly virtualScroll = input(false);

  /** Emits the selected value whenever it changes. */
  readonly change = output<unknown>();
  /** Emits the search text on every keystroke — wire this to an API call for server-side search. */
  readonly search = output<string>();

  protected readonly _open = signal(false);
  protected readonly _searchText = signal('');
  protected readonly _activeIndex = signal(-1);
  protected readonly _scrollTop = signal(0);

  protected readonly _value = signal<unknown>(null);
  protected readonly _disabledByForm = signal(false);
  protected readonly _touched = signal(false);

  protected readonly _isDisabled = computed(() => this.disabled() || this._disabledByForm());

  protected readonly _rowHeight = ROW_HEIGHT;

  private readonly _host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly _trigger = viewChild<ElementRef<HTMLElement>>('trigger');
  private readonly _searchInput = viewChild<ElementRef<HTMLInputElement>>('searchInput');
  private readonly _viewport = viewChild<ElementRef<HTMLElement>>('viewport');

  private _onChange: (value: unknown) => void = () => {};
  private _onTouched: () => void = () => {};

  /** Every item normalized, in source order — the source of truth for the selected label. */
  private readonly _all = computed<NormalizedOption[]>(() =>
    this.items().map((item, index) => this._normalize(item, index)),
  );

  /** Options surviving the current search text, re-indexed to their rendered position. */
  protected readonly _visible = computed<NormalizedOption[]>(() => {
    const term = this.searchable() ? this._searchText().trim().toLowerCase() : '';
    const matched = term
      ? this._all().filter((o) => o.label.toLowerCase().includes(term))
      : this._all();
    return matched.map((o, index) => ({ ...o, index }));
  });

  protected readonly _groups = computed(() => {
    if (!this.groupBy()) return [];
    const groups = new Map<unknown, { label: string; options: NormalizedOption[] }>();
    for (const option of this._visible()) {
      let group = groups.get(option.group);
      if (!group) {
        group = { label: option.group == null ? '' : String(option.group), options: [] };
        groups.set(option.group, group);
      }
      group.options.push(option);
    }
    return [...groups.values()];
  });

  protected readonly _selectedLabel = computed(() => {
    const value = this._value();
    if (value === null || value === undefined) return '';
    return this._all().find((o) => o.value === value)?.label ?? '';
  });

  protected readonly _useVirtual = computed(() => this.virtualScroll() && !this.groupBy());

  // --- Virtual scroll window ---

  protected readonly _totalHeight = computed(() => this._visible().length * ROW_HEIGHT);

  protected readonly _viewportHeight = computed(() =>
    Math.min(this._totalHeight(), VIEWPORT_HEIGHT),
  );

  private readonly _startIndex = computed(() =>
    Math.max(0, Math.floor(this._scrollTop() / ROW_HEIGHT) - OVERSCAN),
  );

  protected readonly _window = computed(() => {
    const end = Math.min(
      this._visible().length,
      Math.ceil((this._scrollTop() + VIEWPORT_HEIGHT) / ROW_HEIGHT) + OVERSCAN,
    );
    return this._visible().slice(this._startIndex(), end);
  });

  protected readonly _offsetTop = computed(() => this._startIndex() * ROW_HEIGHT);

  // --- Interaction ---

  protected _toggle(): void {
    if (this._isDisabled()) return;
    this._open() ? this._close() : this._openDropdown();
  }

  protected _onOptionClick(option: NormalizedOption): void {
    if (option.disabled) return;
    this._select(option.value);
  }

  protected _setActive(option: NormalizedOption): void {
    if (!option.disabled) this._activeIndex.set(option.index);
  }

  protected _onSearch(event: Event): void {
    const text = (event.target as HTMLInputElement).value;
    this._searchText.set(text);
    this.search.emit(text);
    this._scrollTop.set(0);
    this._activeIndex.set(this._firstSelectable());
  }

  protected _onScroll(event: Event): void {
    this._scrollTop.set((event.target as HTMLElement).scrollTop);
  }

  protected _onDocumentPointerDown(event: PointerEvent): void {
    if (this._open() && !this._host.nativeElement.contains(event.target as Node)) {
      this._close();
    }
  }

  protected _onKeydown(event: KeyboardEvent, fromSearch: boolean): void {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this._open() ? this._move(1) : this._openDropdown();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this._open() ? this._move(-1) : this._openDropdown();
        break;
      case 'Enter':
        event.preventDefault();
        this._open() ? this._selectActive() : this._openDropdown();
        break;
      case ' ':
        // The search box needs Space to type; elsewhere it opens/selects.
        if (fromSearch && this._open()) break;
        event.preventDefault();
        this._open() ? this._selectActive() : this._openDropdown();
        break;
      case 'Escape':
        if (this._open()) {
          event.preventDefault();
          this._close();
        }
        break;
      case 'Tab':
        this._close();
        break;
    }
  }

  protected _onBlur(event: FocusEvent): void {
    // Only a focus leaving the whole component counts as a blur for touched-state.
    if (!this._host.nativeElement.contains(event.relatedTarget as Node)) {
      this._touched.set(true);
      this._onTouched();
    }
  }

  private _openDropdown(): void {
    if (this._isDisabled()) return;
    this._open.set(true);
    const selected = this._visible().findIndex((o) => o.value === this._value() && !o.disabled);
    this._activeIndex.set(selected >= 0 ? selected : this._firstSelectable());
    // Wait for the dropdown to render before focusing the search box / scrolling.
    queueMicrotask(() => {
      this._searchInput()?.nativeElement.focus();
      this._scrollActiveIntoView();
    });
  }

  private _close(): void {
    if (!this._open()) return;
    this._open.set(false);
    this._searchText.set('');
    this._scrollTop.set(0);
    this._activeIndex.set(-1);
  }

  private _select(value: unknown): void {
    this._value.set(value);
    this._onChange(value);
    this.change.emit(value);
    this._close();
    this._trigger()?.nativeElement.focus();
  }

  private _selectActive(): void {
    const option = this._visible()[this._activeIndex()];
    if (option && !option.disabled) this._select(option.value);
  }

  private _move(delta: number): void {
    const options = this._visible();
    if (!options.length) return;

    let next = this._activeIndex();
    for (let i = 0; i < options.length; i++) {
      next = (next + delta + options.length) % options.length;
      if (!options[next].disabled) {
        this._activeIndex.set(next);
        break;
      }
    }
    queueMicrotask(() => this._scrollActiveIntoView());
  }

  private _firstSelectable(): number {
    return this._visible().findIndex((o) => !o.disabled);
  }

  private _scrollActiveIntoView(): void {
    const viewport = this._viewport()?.nativeElement;
    const index = this._activeIndex();
    if (!viewport || index < 0) return;

    if (this._useVirtual()) {
      const top = index * ROW_HEIGHT;
      const bottom = top + ROW_HEIGHT;
      if (top < viewport.scrollTop) viewport.scrollTop = top;
      else if (bottom > viewport.scrollTop + viewport.clientHeight)
        viewport.scrollTop = bottom - viewport.clientHeight;
    } else {
      viewport
        .querySelector<HTMLElement>(`[data-index="${index}"]`)
        ?.scrollIntoView({ block: 'nearest' });
    }
  }

  protected _isSelected(value: unknown): boolean {
    const current = this._value();
    return current !== null && current !== undefined && value === current;
  }

  private _normalize(item: unknown, index: number): NormalizedOption {
    if (item !== null && typeof item === 'object') {
      const record = item as Record<string, unknown>;
      const valueKey = this.bindValue();
      const labelKey = this.bindLabel();
      const value = valueKey ? record[valueKey] : item;
      const label = labelKey
        ? String(record[labelKey] ?? '')
        : String((valueKey ? value : undefined) ?? item);
      const disabledKey = this.bindDisabled();
      const groupKey = this.groupBy();
      return {
        value,
        label,
        disabled: disabledKey ? !!record[disabledKey] : false,
        group: groupKey ? record[groupKey] : undefined,
        index,
      };
    }
    return { value: item, label: String(item), disabled: false, group: undefined, index };
  }

  writeValue(value: unknown): void {
    this._value.set(value ?? null);
  }

  registerOnChange(fn: (value: unknown) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabledByForm.set(isDisabled);
  }
}
