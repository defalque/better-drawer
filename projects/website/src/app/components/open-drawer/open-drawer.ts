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
  template: `
    <div bdDrawerRoot class="contents" [(open)]="openDrawer" direction="bottom">
      <button
        type="button"
        bdDrawerTrigger
        class="bg-black dark:bg-zinc-100 text-white dark:text-black px-6 py-2 rounded-lg font-semibold ring-1 ring-black/15 dark:ring-zinc-900/15 shadow-lg dark:shadow-black/50 inset-shadow-sm inset-shadow-white/50 dark:inset-shadow-black/40 cursor-pointer active:scale-95 transition-transform duration-200 focus"
      >
        Open Drawer
      </button>
      @if (openDrawer()) {
        <div bdDrawerOverlay class="bg-black/50"></div>
        <div
          bdDrawerContent
          class="flex flex-col flex-1 bg-zinc-50 dark:bg-zinc-900 h-84 fixed bottom-0 left-0 right-0 rounded-t-xl border-t border-zinc-200/50 dark:border-zinc-800/50 outline-none"
        >
          <div class="space-y-4 max-w-md mx-auto pt-4 px-4">
            <h2
              bdDrawerTitle
              class="text-xl font-semibold tracking-tight text-zinc-950 dark:text-white"
            >
              Hello from Better Drawer
            </h2>
            <p class="text-zinc-600 dark:text-zinc-300 text-pretty">
              This component can be used as a Dialog replacement or as a sidebar on mobile and
              tablet devices.
            </p>
            <p class="text-zinc-600 dark:text-zinc-300 text-pretty">
              It comes unstyled, has gesture-driven animations and is made by
              <a
                href="https://marcodefalco.dev"
                target="_blank"
                rel="noopener"
                class="text-orange-500 dark:text-orange-400 underline underline-offset-2"
                >Marco De Falco</a
              >.
            </p>
          </div>

          <div
            class="bg-gray-200 dark:bg-zinc-800/60 py-4 mt-auto border-t border-zinc-400/30 dark:border-zinc-600/30"
          >
            <div class="max-w-lg mx-auto flex justify-end gap-2 px-4">
              <a
                href="https://github.com/defalque/better-drawer"
                target="_blank"
                rel="noopener noreferrer"
                class="text-zinc-600 dark:text-zinc-300 text-pretty flex items-center gap-1 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors duration-200 text-sm"
              >
                <span>Github</span>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  class="size-3"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M21 9.00001L21 3.00001M21 3.00001H15M21 3.00001L12 12M10 3H7.8C6.11984 3 5.27976 3 4.63803 3.32698C4.07354 3.6146 3.6146 4.07354 3.32698 4.63803C3 5.27976 3 6.11984 3 7.8V16.2C3 17.8802 3 18.7202 3.32698 19.362C3.6146 19.9265 4.07354 20.3854 4.63803 20.673C5.27976 21 6.11984 21 7.8 21H16.2C17.8802 21 18.7202 21 19.362 20.673C19.9265 20.3854 20.3854 19.9265 20.673 19.362C21 18.7202 21 17.8802 21 16.2V14"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
      }
    </div>
  `,
})
export class MyDrawer {
  protected openDrawer = model(false);
}
