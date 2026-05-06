import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { DocGettingStarted } from './pages/docs/doc-getting-started/doc-getting-started';
import { DocsShell } from './pages/docs/docs-shell/docs-shell';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Better Drawer',
  },
  {
    path: 'docs',
    component: DocsShell,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'getting-started' },
      {
        path: 'getting-started',
        component: DocGettingStarted,
        title: 'Getting Started - Better Drawer',
      },
      {
        path: 'api',
        component: Home,
        title: 'API - Better Drawer',
      },
      {
        path: 'default',
        component: Home,
        title: 'Default - Better Drawer',
      },
      {
        path: 'other',
        component: Home,
        title: 'Other - Better Drawer',
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
