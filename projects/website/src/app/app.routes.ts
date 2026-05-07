import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { DocGettingStarted } from './pages/docs/doc-getting-started/doc-getting-started';
import { DocsShell } from './pages/docs/docs-shell/docs-shell';
import { DocConsiderations } from './pages/docs/doc-considerations/doc-considerations';
import { DocDefault } from './pages/docs/doc-default/doc-default';
import { DocApi } from './pages/docs/doc-api/doc-api';
import { DocOther } from './pages/docs/doc-other/doc-other';

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
        path: 'considerations',
        component: DocConsiderations,
        title: 'Considerations - Better Drawer',
      },
      {
        path: 'api',
        component: DocApi,
        title: 'API - Better Drawer',
      },
      {
        path: 'default',
        component: DocDefault,
        title: 'Default - Better Drawer',
      },
      {
        path: 'other',
        component: DocOther,
        title: 'Other - Better Drawer',
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
