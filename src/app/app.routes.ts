import { Routes } from '@angular/router';
import { ShowcaseLayout } from './showcase/showcase-layout/showcase-layout';

export const routes: Routes = [
  {
    path: '',
    component: ShowcaseLayout,
    children: [
      { path: '', redirectTo: 'button', pathMatch: 'full' },
      {
        path: 'button',
        loadComponent: () =>
          import('./showcase/pages/button-stories/button-stories').then((m) => m.ButtonStories),
      },
      {
        path: 'text-input',
        loadComponent: () =>
          import('./showcase/pages/text-input-stories/text-input-stories').then(
            (m) => m.TextInputStories,
          ),
      },
      {
        path: 'password-input',
        loadComponent: () =>
          import('./showcase/pages/password-input-stories/password-input-stories').then(
            (m) => m.PasswordInputStories,
          ),
      },
      {
        path: 'email-input',
        loadComponent: () =>
          import('./showcase/pages/email-input-stories/email-input-stories').then(
            (m) => m.EmailInputStories,
          ),
      },
      {
        path: 'number-input',
        loadComponent: () =>
          import('./showcase/pages/number-input-stories/number-input-stories').then(
            (m) => m.NumberInputStories,
          ),
      },
      {
        path: 'select',
        loadComponent: () =>
          import('./showcase/pages/select-stories/select-stories').then((m) => m.SelectStories),
      },
      {
        path: 'textarea',
        loadComponent: () =>
          import('./showcase/pages/textarea-stories/textarea-stories').then(
            (m) => m.TextareaStories,
          ),
      },
      {
        path: 'toggle',
        loadComponent: () =>
          import('./showcase/pages/toggle-stories/toggle-stories').then((m) => m.ToggleStories),
      },
      {
        path: 'checkbox',
        loadComponent: () =>
          import('./showcase/pages/checkbox-stories/checkbox-stories').then(
            (m) => m.CheckboxStories,
          ),
      },
      {
        path: 'radio',
        loadComponent: () =>
          import('./showcase/pages/radio-stories/radio-stories').then((m) => m.RadioStories),
      },
      {
        path: 'modal',
        loadComponent: () =>
          import('./showcase/pages/modal-stories/modal-stories').then((m) => m.ModalStories),
      },
      {
        path: 'drawer',
        loadComponent: () =>
          import('./showcase/pages/drawer-stories/drawer-stories').then((m) => m.DrawerStories),
      },
      {
        path: 'form-validation',
        loadComponent: () =>
          import('./showcase/pages/form-validation-stories/form-validation-stories').then(
            (m) => m.FormValidationStories,
          ),
      },
    ],
  },
];
