export const ON_NON_MODAL_DRAWER_SOURCE = `import { Component, model } from '@angular/core';
import { BetterDrawerContent, BetterDrawerOverlay, BetterDrawerRoot, BetterDrawerTitle, BetterDrawerTrigger } from 'better-drawer';

@Component({
  selector: 'app-my-non-modal-drawer',
  imports: [
    BetterDrawerRoot, BetterDrawerTrigger, BetterDrawerOverlay, BetterDrawerContent, BetterDrawerTitle
  ],
  template: '
    <div bdDrawerRoot class="contents" [(open)]="openNonModalDrawer" [modal]="false">
      <button type="button" bdDrawerTrigger class="btn">
        Open non modal drawer
      </button>
      @if (openNonModalDrawer()) {
        <div bdDrawerOverlay class="bg-black/50"></div>
        <div bdDrawerContent class="fixed bottom-0 left-0 right-0 outline-none...">
          <div class="space-y-4 max-w-md mx-auto pt-4">
            <h2 bdDrawerTitle class="title">
              This is a non modal drawer
            </h2>
            <p class="description">
              Interaction with the background is allowed while the drawer is open.
            </p>
          </div>
        </div>
      }
    </div>
  ',
})
export class MyNonModalDrawer {
  protected openNonModalDrawer = model(false);
}`;

export const ON_NON_DISMISSIBLE_DRAWER_SOURCE = `import { Component, model } from '@angular/core';
import { BetterDrawerContent, BetterDrawerOverlay, BetterDrawerRoot, BetterDrawerTitle, BetterDrawerTrigger } from 'better-drawer';

@Component({
  selector: 'app-my-non-dismissible-drawer',
  imports: [
    BetterDrawerRoot, BetterDrawerTrigger, BetterDrawerOverlay, BetterDrawerContent, BetterDrawerTitle
  ],
  template: '
    <div bdDrawerRoot class="contents" [(open)]="openNonDismissibleDrawer" direction="bottom" [dismissible]="false">
      <button type="button" bdDrawerTrigger class="btn">
        Open non dismissible drawer
      </button>
      @if (openNonDismissibleDrawer()) {
        <div bdDrawerOverlay class="bg-black/50"></div>
        <aside bdDrawerContent class="fixed left-0 bottom-0 right-0 outline-none...">
          <div class="space-y-4 max-w-md mx-auto pt-4">
            <h2 bdDrawerTitle class="title">
              This is a non dismissible drawer
            </h2>
            <p class="description">
              You can't close the drawer by clicking outside of it, pressing the escape key, or dragging it down.
            </p>
          </div>
        </aside>
      }
    </div>
  ',
})
export class MyNonDismissibleDrawer {
  protected openNonDismissibleDrawer = model(false);
}`;
