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
    ],
  },
];
