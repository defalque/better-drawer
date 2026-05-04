import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  Directive,
  input,
  model,
  signal,
} from '@angular/core';
import { BetterDrawerPosition } from './better-drawer.types';

let betterDrawerTitleSeq = 0;

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

@Directive({
  selector: 'h2[bdDrawerTitle]',
  host: {
    '[attr.id]': 'titleId()',
  },
})
export class BetterDrawerTitle {
  /**
   * Unique DOM id for this heading; the parent drawer sets `aria-labelledby` to this value.
   */
  readonly titleId = signal(`bd-drawer-title-${++betterDrawerTitleSeq}`);
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
    '[attr.tabindex]': '-1',
    '[attr.aria-labelledby]': 'ariaLabelledBy()',
  },
})
export class BetterDrawer {
  private readonly drawerTitle = contentChild(BetterDrawerTitle, { descendants: true });

  protected readonly ariaLabelledBy = computed(() => this.drawerTitle()?.titleId() ?? null);

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
