---
name: frontend-design
description: Design and build polished Angular UI components for the LumenUI library. Invoke whenever the user asks to create, design, make, build, or restyle a UI component or element (button, input, card, modal, etc.). Carries the design quality bar, the LumenUI scaffold pattern (l- selector, signal inputs, _ private members, SCSS tokens), and accessibility/theming requirements.
---

# Frontend Design — LumenUI

Use this skill to build LumenUI components that look intentional, behave correctly, and stay themeable. LumenUI is a template library, so every component is a reusable, configurable element — not a one-off.

## 1. Clarify scope before building

Settle these (ask only if genuinely ambiguous — otherwise pick sensible defaults and state them):
- **Variants** (e.g. button: `primary | secondary | ghost | danger`).
- **Sizes** (e.g. `sm | md | lg`), with `md` as default.
- **States**: hover, focus-visible, active, disabled, loading, and (where relevant) error/success.
- **Configurable API**: which inputs/outputs the consumer needs.

## 2. Scaffold pattern

Every component is standalone, signal-based, `l-`-prefixed, with `_` on internals. Co-locate `.ts`, `.html`, `.scss`.

```ts
import { Component, ChangeDetectionStrategy, computed, input, output } from '@angular/core';

@Component({
  selector: 'l-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './button.html',
  styleUrl: './button.scss',
  host: {
    '[class]': '_hostClasses()',
  },
})
export class Button {
  readonly variant = input<'primary' | 'secondary' | 'ghost' | 'danger'>('primary');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly pressed = output<void>();

  protected readonly _hostClasses = computed(
    () => `l-button l-button--${this.variant()} l-button--${this.size()}`,
  );
}
```

- `ChangeDetectionStrategy.OnPush` on every component.
- Public, template-, and consumer-facing members: no prefix. Internal state/helpers: `_` prefix.
- Prefer `input()`/`output()`/`model()` over decorators.

## 3. Design system — use tokens, never magic values

Define and consume CSS custom properties / SCSS tokens so the whole library themes from one place. Put global tokens in `src/styles.scss`; components reference them.

- **Color**: semantic tokens (`--l-color-primary`, `--l-color-surface`, `--l-color-text`, `--l-color-border`, `--l-color-danger`). Never hard-code hex in a component.
- **Spacing**: consistent scale (4px base → `--l-space-1: 4px`, `-2: 8px`, `-3: 12px`, `-4: 16px`, …).
- **Radius**: `--l-radius-sm/md/lg`.
- **Typography**: token-driven font sizes, weights, line-heights.
- **Elevation**: a small, consistent shadow scale (`--l-shadow-1/2/3`).
- **Motion**: short, purposeful transitions (120–200ms, ease-out). Respect `prefers-reduced-motion`.

## 4. Visual quality bar

Aim for a refined, modern look — not a browser-default look.

- **Hierarchy & spacing**: generous, consistent padding; align to the spacing scale. Whitespace is a feature.
- **Depth done lightly**: subtle borders + soft shadows over heavy ones. Avoid harsh `1px solid black`.
- **States must be visible and distinct**: hover, `:focus-visible` (always a clear focus ring — never `outline: none` without a replacement), active, disabled (reduced opacity + `cursor: not-allowed`), loading.
- **Polish details**: rounded corners from the radius scale, smooth transitions, optical alignment of icons/text.
- **Dark mode**: drive colors through tokens so a `prefers-color-scheme` / `[data-theme]` switch works without per-component edits.

## 5. Accessibility (non-negotiable)

- Semantic HTML first (`<button>`, `<input>`, `<label>`, `<dialog>`); reach for ARIA only to fill gaps.
- Keyboard operable: logical tab order, Enter/Space activation, Esc to dismiss overlays, focus trap + restore for modals.
- Visible `:focus-visible` indicator on every interactive element.
- Associate labels with controls; expose `aria-disabled`, `aria-expanded`, `aria-pressed`, etc. as the pattern requires.
- Meet WCAG AA contrast.

## 6. SCSS structure

Style via the host classes the component emits. Keep styles scoped, token-driven, and variant/size organized.

```scss
:host {
  display: inline-block;
}

.l-button {
  display: inline-flex;
  align-items: center;
  gap: var(--l-space-2);
  padding: var(--l-space-2) var(--l-space-4);
  border-radius: var(--l-radius-md);
  font-weight: 600;
  cursor: pointer;
  transition: background-color 150ms ease-out, box-shadow 150ms ease-out;

  &--primary {
    background: var(--l-color-primary);
    color: var(--l-color-on-primary);
  }

  &:focus-visible {
    outline: 2px solid var(--l-color-focus);
    outline-offset: 2px;
  }

  &:disabled,
  &[aria-disabled='true'] {
    opacity: 0.5;
    cursor: not-allowed;
  }
}

@media (prefers-reduced-motion: reduce) {
  .l-button { transition: none; }
}
```

## 7. Deliver

- Component (`.ts` + `.html` + `.scss`) following the scaffold and naming rules from `CLAUDE.md`.
- New tokens added to `src/styles.scss` if introduced.
- Usage example showing the `<l-...>` selector with its inputs.
- A quick self-check: variants render, all states visible, keyboard + focus work, no hard-coded colors/spacing, builds clean.
