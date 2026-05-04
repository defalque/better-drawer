import { ChangeDetectionStrategy, Component, input, model } from '@angular/core';
import { BetterDrawerPosition } from './better-drawer.types';

@Component({
  selector: '[bdOverlay]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
  styleUrl: './overlay.css',
  host: {
    '[attr.aria-hidden]': 'true',
    '(click)': 'close()',
    '(document:keydown.escape)': 'onEscape($event)',
    'animate.enter': 'overlay-enter',
    'animate.leave': 'overlay-leave',
  },
})
export class BetterDrawerOverlay {
  /**
   * Two-way binding for whether the drawer and overlay are visible.
   * Parent and child stay in sync when this value changes.
   */
  readonly open = model(false);

  /**
   * Collapses the drawer and hides the backdrop (invoked when the overlay is clicked).
   */
  protected close(): void {
    this.open.set(false);
  }

  /**
   * Collapses the drawer and hides the backdrop (invoked when the Escape key is pressed).
   */
  protected onEscape(event: Event): void {
    if (!this.open()) {
      return;
    }
    event.preventDefault();
    this.close();
  }
}

@Component({
  selector: '[bdDrawer]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<ng-content />',
  styleUrl: './drawer.css',
  host: {
    '[attr.role]': '"dialog"',
    '[attr.data-position]': 'position()',
    '(click)': '$event.stopPropagation()',
    '(document:keydown.escape)': 'onEscape($event)',
    'animate.enter': 'drawer-enter',
    'animate.leave': 'drawer-leave',
  },
})
export class BetterDrawer {
  /**
   * Two-way binding for whether the drawer and overlay are visible.
   * Parent and child stay in sync when this value changes.
   */
  readonly open = model(false);
  /**
   * Which viewport edge the panel slides from: `left`, `right`, `top`, or `bottom`.
   * @default `left`.
   */
  readonly position = input<BetterDrawerPosition>('left');

  /**
   * Collapses the drawer and hides the backdrop (invoked when the overlay is clicked).
   */
  protected close(): void {
    this.open.set(false);
  }

  /**
   * Collapses the drawer and hides the backdrop (invoked when the Escape key is pressed).
   */
  protected onEscape(event: Event): void {
    if (!this.open()) {
      return;
    }
    event.preventDefault();
    this.close();
  }
}
