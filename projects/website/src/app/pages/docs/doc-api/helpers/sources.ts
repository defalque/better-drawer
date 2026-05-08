export const ON_ANATOMY_SOURCE = `import { Component, model } from '@angular/core';
import { 
  BetterDrawerContent,
  BetterDrawerOverlay,
  BetterDrawerPortal,
  BetterDrawerRoot,
  BetterDrawerTitle,
  BetterDrawerTrigger,
} from 'better-drawer';

@Component({
  selector: 'app-my-drawer',
  imports: [
    BetterDrawerContent, 
    BetterDrawerOverlay, 
    BetterDrawerPortal,
    BetterDrawerRoot, 
    BetterDrawerTitle,
    BetterDrawerTrigger, 
  ],
  template: '
    <div bdDrawerRoot [(open)]="openDrawer">
      <button type="button" bdDrawerTrigger>
        Open Drawer
      </button>
      <ng-template bdDrawerPortal>
        @if (openDrawer()) {
          <div bdDrawerOverlay></div>
          <div bdDrawerContent>
              <h2 bdDrawerTitle></h2>
          </div>
        }
      </ng-template>
    </div>
  ',
})
export class MyDrawer {
  protected openDrawer = model(false);
}`;

export const ON_DRAWER_ROOT_SOURCE = `<!-- my-drawer.ts -->
protected openDrawer = model(false);

<!-- my-drawer.html -->
<div bdDrawerRoot [(open)]="openDrawer">
  <!-- place your drawer trigger and content parts here -->
</div>`;

export const ON_DRAWER_TRIGGER_SOURCE = `<!-- my-drawer.html -->
<!-- inside your drawer root -->
<button bdDrawerTrigger type="button">...</button>`;

export const ON_DRAWER_PORTAL_SOURCE = `<!-- my-drawer.ts -->
protected openDrawer = model(false);

<!-- my-drawer.html -->
<!-- inside your drawer root -->
<ng-template bdDrawerPortal>
  <!-- overlay and content parts -->
</ng-template>`;

export const ON_DRAWER_OVERLAY_SOURCE = `<!-- my-drawer.ts -->
protected openDrawer = model(false);

<!-- my-drawer.html -->
<!-- inside your drawer root -->
@if (openDrawer()) {
    <div bdDrawerOverlay></div>
    <!-- content part -->
}`;

export const ON_DRAWER_CONTENT_SOURCE = `<!-- my-drawer.ts -->
protected openDrawer = model(false);

<!-- my-drawer.html -->
<!-- inside your drawer root -->
@if (openDrawer()) {
    <!-- overlay part -->
    <div bdDrawerContent></div>
}`;

export const ON_DRAWER_TITLE_SOURCE = `<!-- my-drawer.ts -->
protected openDrawer = model(false);

<!-- my-drawer.html -->
<!-- inside your drawer root -->
@if (openDrawer()) {
    <!-- overlay part -->
    <div bdDrawerContent>
        <h2 bdDrawerTitle></h2>
    </div>
}`;
