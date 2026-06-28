# LumenUI

LumenUI is an Angular component library — a collection of reusable, polished UI element templates (buttons, inputs, cards, modals, etc.) built for Angular 22.

## Commands

| Task | Command |
| --- | --- |
| Dev server (http://localhost:4200) | `npm start` |
| Build | `npm run build` |
| Build (watch, dev) | `npm run watch` |
| Unit tests (Vitest) | `npm test` |
| Generate a component | `ng generate component <name>` |

## Tech stack

- **Angular 22** — standalone components only (no `NgModule`).
- **Signals** — use `signal()`, `computed()`, `input()`, `output()`, `model()` for reactive state. Prefer the signal-based `input()`/`output()` APIs over the `@Input()`/`@Output()` decorators.
- **OnPush change detection** — all components use `ChangeDetectionStrategy.OnPush` (the schematic default). Pairs naturally with signals; avoid mutating state in ways that bypass change detection.
- **SCSS** for all styles (`inlineStyleLanguage` and component `styleUrl` are scss).
- **Vitest** for unit tests.
- **Prettier**: single quotes, `printWidth: 100`. Run formatting through Prettier; HTML uses the `angular` parser.

## Conventions

### Component selectors — `l-` prefix
Every public component exposes an `l-`-prefixed element selector, e.g. `<l-button>`, `<l-input>`, `<l-card>`. Use kebab-case after the prefix (`<l-date-picker>`).

```ts
@Component({
  selector: 'l-button',
  // ...
})
export class Button { }
```

> Note: `angular.json` sets the schematic `prefix` to `app`. When scaffolding LumenUI components, set the selector to `l-...` manually (or pass `--prefix l`), since the default scaffold will emit `app-`.

### Change detection — `OnPush`
Components default to `ChangeDetectionStrategy.OnPush` (configured in `angular.json` schematics, so `ng generate component` scaffolds it automatically). Set it explicitly when hand-authoring a component.

```ts
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'l-button',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // ...
})
export class Button {}
```

### Private members — `_` prefix
Prefix all private and protected internal properties, fields, and methods with `_`. This applies to component class internals, services, and helpers — anything not part of the public/template-facing API.

```ts
export class Button {
  // public API — consumed by template bindings or library users
  readonly variant = input<'primary' | 'secondary'>('primary');

  // internal state / helpers
  private readonly _hovered = signal(false);
  private _resetFocus(): void { /* ... */ }
}
```

Public inputs/outputs and members referenced from the template stay un-prefixed (templates can't read truly private members anyway). The `_` prefix marks implementation detail.

## Building component UI

**When the user asks to create, design, make, or build a component (or its UI), invoke the `frontend-design` skill first.** It carries the design system, visual quality bar, and the LumenUI component scaffold pattern. Don't hand-roll component markup/styles without it.

## Code style

- Match the surrounding code's idioms, naming, and comment density.
- Keep components focused and presentational; push shared logic into services or utilities.
- Use SCSS variables/tokens for color, spacing, and typography rather than hard-coded values so components stay themeable.
- **Comment only when it adds value.** Prefer self-explanatory names for methods, functions, and variables over comments. If a name makes the intent clear, don't add a comment that just restates it. Reserve comments for the non-obvious: *why* a decision was made, tricky edge cases, workarounds, or context the code can't convey on its own.
