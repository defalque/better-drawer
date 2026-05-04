import { Component, input, model } from '@angular/core';
import { BetterDrawerPosition } from './better-drawer.types';

@Component({
  selector: 'better-drawer',
  imports: [],
  template: `
    @if (open()) {
      <div
        aria-hidden="true"
        class="overlay"
        (click)="close()"
        animate.enter="overlay-enter"
        animate.leave="overlay-leave"
      ></div>
      <div
        role="dialog"
        class="drawer"
        [attr.data-position]="position()"
        (click)="$event.stopPropagation()"
        animate.enter="drawer-enter"
        animate.leave="drawer-leave"
      ></div>
    }
  `,
  styleUrl: './styles.css',
})
export class BetterDrawer {
  readonly open = model(false);
  readonly position = input<BetterDrawerPosition>('left');

  protected close(): void {
    this.open.set(false);
  }
}
