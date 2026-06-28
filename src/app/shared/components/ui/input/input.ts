import { Directive, Type, computed, forwardRef, input, output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

let _uid = 0;

/**
 * Registers a concrete input component as the value accessor for itself, so it
 * works with both `[(ngModel)]` and reactive forms. Pass a thunk because the
 * component class isn't defined yet when its own `providers` are evaluated.
 */
export function provideInputValueAccessor(component: () => Type<unknown>) {
  return {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(component),
    multi: true,
  };
}

/**
 * Registers a concrete input component as a `Validator` for its own bound
 * control, so format errors (e.g. email) surface in `ngModel`/reactive forms.
 */
export function provideInputValidator(component: () => Type<unknown>) {
  return {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(component),
    multi: true,
  };
}

/**
 * Shared logic for all LumenUI text-like inputs. Holds the common inputs,
 * native event outputs and the `ControlValueAccessor` bridge; concrete
 * components (`TextInput`, …) extend this and set {@link type}.
 */
@Directive()
export abstract class BaseInput implements ControlValueAccessor {
  /** Native input `type` — set by the concrete subclass. */
  protected abstract readonly type: string;

  readonly label = input<string>('');
  readonly placeholder = input<string>('');
  readonly disabled = input<boolean>(false);
  readonly id = input<string>(`l-input-${_uid++}`);

  readonly input = output<Event>();
  readonly change = output<Event>();
  readonly keyup = output<KeyboardEvent>();
  readonly keydown = output<KeyboardEvent>();
  readonly keypress = output<KeyboardEvent>();
  readonly enter = output<KeyboardEvent>();

  protected readonly _value = signal('');
  protected readonly _disabledByForm = signal(false);
  protected readonly _touched = signal(false);

  protected readonly _isDisabled = computed(() => this.disabled() || this._disabledByForm());

  private _onChange: (value: string) => void = () => {};
  private _onTouched: () => void = () => {};

  protected _handleInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this._value.set(value);
    this._onChange(value);
    this.input.emit(event);
  }

  protected _handleEnter(event: Event): void {
    this.enter.emit(event as KeyboardEvent);
  }

  protected _handleBlur(): void {
    this._touched.set(true);
    this._onTouched();
  }

  writeValue(value: string | null): void {
    this._value.set(value ?? '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this._disabledByForm.set(isDisabled);
  }
}
