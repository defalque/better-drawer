export const DRAWER_INSTALLATION_SOURCE = 'npm install better-drawer';

export const DRAWER_USAGE_SOURCE = `import { Component, model } from '@angular/core';
import { BetterDrawerContent, BetterDrawerOverlay, BetterDrawerRoot, BetterDrawerTitle, BetterDrawerTrigger } from 'better-drawer';

@Component({
  selector: 'app-my-drawer',
  imports: [
    BetterDrawerRoot, BetterDrawerTrigger, BetterDrawerOverlay, BetterDrawerContent, 
    BetterDrawerTitle,
  ],
  template: ' 
    <div bdDrawerRoot class="contents" [(open)]="openDrawer">
      <button type="button" bdDrawerTrigger class="btn">My Drawer</button>
      @if (openDrawer()) {
        <div bdDrawerOverlay class="overlay"></div>
        <aside bdDrawerContent class="content" >
          <div class="content-inner">
            <h2 bdDrawerTitle class="title">My Drawer</h2>
            <p class="description">This is a drawer component.</p>
          </div>
        </aside>
      }
    </div>
  ',
})
export class MyDrawer {
  protected openDrawer = model(false);
}`;
