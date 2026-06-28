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
        path: 'form-validation',
        loadComponent: () =>
          import('./showcase/pages/form-validation-stories/form-validation-stories').then(
            (m) => m.FormValidationStories,
          ),
      },
    ],
  },
];
