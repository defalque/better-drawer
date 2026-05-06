import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'docs/getting-started',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'docs/api',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'docs/default',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'docs/other',
    renderMode: RenderMode.Prerender,
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
