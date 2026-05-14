export const ON_DEFAULT_SOURCE = `import { Component, model } from '@angular/core';
import { BetterDrawerContent, BetterDrawerOverlay, BetterDrawerRoot, BetterDrawerTitle, BetterDrawerTrigger } from 'better-drawer';

@Component({
  selector: 'app-my-drawer',
  imports: [
    BetterDrawerRoot, BetterDrawerTrigger, BetterDrawerOverlay, BetterDrawerContent, BetterDrawerTitle
  ],
  template: '
    <div bdDrawerRoot class="contents" [(open)]="openDrawer">
      <button type="button" bdDrawerTrigger class="btn">
        Open Drawer
      </button>
      @if (openDrawer()) {
        <div bdDrawerOverlay class="bg-black/50"></div>
        <div bdDrawerContent class="fixed bottom-0 left-0 right-0 outline-none...">
          <div class="space-y-4 max-w-md mx-auto pt-4">
            <h2 bdDrawerTitle class="title">
              This is a default drawer
            </h2>
            <p class="description">
              Comes from the bottom side of the screen.
            </p>
          </div>
        </div>
      }
    </div>
  ',
})
export class MyDrawer {
  protected openDrawer = model(false);
}`;

export const ON_SIDE_DRAWER_SOURCE = `import { Component, model } from '@angular/core';
import { BetterDrawerContent, BetterDrawerOverlay, BetterDrawerRoot, BetterDrawerTitle, BetterDrawerTrigger } from 'better-drawer';

@Component({
  selector: 'app-my-side-drawer',
  imports: [
    BetterDrawerRoot, BetterDrawerTrigger, BetterDrawerOverlay, BetterDrawerContent, BetterDrawerTitle
  ],
  template: '
    <div bdDrawerRoot class="contents" [(open)]="openSideDrawer" direction="left">
      <button type="button" bdDrawerTrigger class="btn">
        Open side drawer
      </button>
      @if (openSideDrawer()) {
        <div bdDrawerOverlay class="bg-black/50"></div>
        <aside bdDrawerContent class="fixed left-0 bottom-0 top-0 outline-none...">
          <div class="space-y-4 max-w-md mx-auto pt-4">
            <h2 bdDrawerTitle class="title">
              This is a side drawer
            </h2>
            <p class="description">
              Comes from the right side of the screen.
            </p>
          </div>
        </aside>
      }
    </div>
  ',
})
export class MySideDrawer {
  protected openSideDrawer = model(false);
}`;

export const ON_NESTED_DRAWER_SOURCE = `import { Component, model } from '@angular/core';
import { BetterDrawerContent, BetterDrawerOverlay, BetterDrawerRoot, BetterDrawerTitle, BetterDrawerTrigger } from 'better-drawer';

@Component({
  selector: 'app-my-nested-drawer',
  imports: [
    BetterDrawerRoot, BetterDrawerTrigger, BetterDrawerOverlay, BetterDrawerContent, BetterDrawerTitle
  ],
  template: '
    <div bdDrawerRoot class="contents" [(open)]="openNestedDrawer" direction="bottom">
      <button type="button" bdDrawerTrigger class="drawer-button">Open drawer</button>
      @if (openNestedDrawer()) {
        <div bdDrawerOverlay class="overlay"></div>
        <div bdDrawerContent class="content">
          <div class="container">
            <h2 bdDrawerTitle class="title">This is a drawer</h2>
            <p class="description">Click the button to open the nested drawer.</p>
            <div bdDrawerRoot class="contents" [(open)]="openNestedDrawer2" direction="bottom">
              <button type="button" bdDrawerTrigger class="btn">
                Open nested drawer
              </button>
              @if (openNestedDrawer2()) {
                <div bdDrawerOverlay class="overlay"></div>
                <div bdDrawerContent class="content">
                  <div class="container">
                    <h2 bdDrawerTitle class="title">This is a nested drawer</h2>
                    <p class="description">This is a drawer inside another drawer.</p>
                  </div>
                </div>
              }
            </div>
          </div>
        </div>
      }          
    </div>
  ',
})
export class MyNestedDrawer {
  protected openSideDrawer = model(false);
  protected openNestedDrawer2 = model(false);
}`;

export const ON_SCROLLABLE_DRAWER_SOURCE = `import { Component, model } from '@angular/core';
import { BetterDrawerContent, BetterDrawerOverlay, BetterDrawerRoot, BetterDrawerTitle, BetterDrawerTrigger } from 'better-drawer';

@Component({
  selector: 'app-my-nested-drawer',
  imports: [
    BetterDrawerRoot, BetterDrawerTrigger, BetterDrawerOverlay, BetterDrawerContent, BetterDrawerTitle
  ],
  template: '
    <div bdDrawerRoot class="contents" [(open)]="openScrollableDrawer">
        <button type="button" bdDrawerTrigger class="drawer-button">
              Open scrollable drawer
        </button>
        @if (openScrollableDrawer()) {
          <div bdDrawerOverlay class="overlay"></div>
          <div
            bdDrawerContent
            class="fixed bottom-0 left-0 right-0 rounded-t-xl shadow-lg shadow-black/5 ring-1 ring-black/5 dark:ring-white/10 h-[320px] outline-none overflow-y-auto"
            style="scrollbar-width: thin"
          >
            <div class="p-4 grid gap-4 max-w-lg overflow-y-auto mx-auto">
              <p class="text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus ullam eaque,
                sapiente omnis voluptas incidunt officiis pariatur explicabo ipsum, illo voluptate quas distinctio blanditiis corrupti. Ipsa minima velit nam illo.
              </p>
            </div>
          </div>
        }
    </div>
  ',
})
export class MyScrollableDrawer {
    protected openScrollableDrawer = model(false);
}`;
