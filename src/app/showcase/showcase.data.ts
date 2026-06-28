/** Registry of showcased components — drives the sidebar nav and routes. */
export interface ShowcaseEntry {
  /** Route path segment, e.g. `button` → `/button`. */
  path: string;
  name: string;
}

export const SHOWCASE_COMPONENTS: ShowcaseEntry[] = [
  { path: 'button', name: 'Button' },
  { path: 'text-input', name: 'Text Input' },
  { path: 'password-input', name: 'Password Input' },
  { path: 'email-input', name: 'Email Input' },
  { path: 'number-input', name: 'Number Input' },
  { path: 'select', name: 'Select' },
  { path: 'textarea', name: 'Textarea' },
  { path: 'toggle', name: 'Toggle' },
  { path: 'checkbox', name: 'Checkbox' },
  { path: 'radio', name: 'Radio' },
  { path: 'modal', name: 'Modal' },
  { path: 'form-validation', name: 'Form Validation' },
];
