import { Component, model } from '@angular/core';
import {
  BetterDrawerContent,
  BetterDrawerOverlay,
  BetterDrawerRoot,
  BetterDrawerTitle,
  BetterDrawerTrigger,
} from 'better-drawer';

@Component({
  selector: 'app-my-drawer',
  imports: [
    BetterDrawerRoot,
    BetterDrawerTrigger,
    BetterDrawerOverlay,
    BetterDrawerContent,
    BetterDrawerTitle,
  ],
  template: ` <div bdDrawerRoot class="contents" [(open)]="openDrawer" direction="left">
    <button type="button" bdDrawerTrigger class="btn">My Drawer</button>
    @if (openDrawer()) {
      <div bdDrawerOverlay class="bg-black/50"></div>
      <aside
        bdDrawerContent
        class="bg-zinc-50 dark:bg-zinc-900 fixed top-0 bottom-0 left-0 rounded-tr-xl rounded-br-xl border-r border-zinc-200/50 dark:border-zinc-800/50 outline-none"
      >
        <div class="p-4 grid gap-4 max-w-lg">
          <h2 bdDrawerTitle class="text-2xl font-bold text-zinc-950 dark:text-white">My Drawer</h2>
          <p class="text-zinc-600 dark:text-zinc-300 text-pretty">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus ullam eaque, sapiente
            omnis voluptas incidunt officiis pariatur explicabo ipsum, illo voluptate quas
            distinctio blanditiis corrupti. Ipsa minima velit nam illo.
          </p>
        </div>
      </aside>
    }
  </div>`,
})
export class MyDrawer {
  protected openDrawer = model(false);
}
