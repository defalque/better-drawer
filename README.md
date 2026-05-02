# Better Drawer (monorepo)

Angular workspace containing the publishable **`better-drawer`** library ([ng-packagr](https://github.com/ng-packagr/ng-packagr)), a **`demo`** app, and a **`website`** app under `projects/`.

## Prerequisites

- Node.js LTS and npm

## Install

```bash
npm install
```

## Library and local consumption

Apps resolve the library via TypeScript path mapping to **`dist/better-drawer`**. Build the library before serving or building apps:

```bash
npm run build:lib
# optional watch while developing:
npx ng build better-drawer --watch
```

## Run apps

```bash
npm run serve:demo      # http://localhost:4200/
npm run serve:website    # separate dev server (use another port if needed: ng serve website --port 4300)
```

Root `npm start` runs the **demo** app.

## Build

```bash
npm run build:lib
ng build demo
ng build website
```

## Projects

| Project | Path | Role |
|--------|------|------|
| `better-drawer` | `projects/better-drawer` | npm package source; public API in `src/public-api.ts` |
| `demo` | `projects/demo` | Component playground |
| `website` | `projects/website` | Marketing / docs shell |

## Further help

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) 20.x.
