import { InjectionToken, type ModelSignal, type Signal, type WritableSignal } from '@angular/core';
import type { BetterDrawerDirection } from './better-drawer.types';

/** Stateful API from `[bdDrawerRoot]` for `bdDrawerContent`, `bdDrawerOverlay`, and `bdDrawerTrigger`. */
export interface BetterDrawerRootContext {
  readonly open: ModelSignal<boolean>;
  readonly direction: Signal<BetterDrawerDirection>;
  readonly modal: Signal<boolean>;
  /**
   * When false, the drawer cannot be closed via overlay click, swipe-to-dismiss,
   * or Escape; callers still close by updating `open` (for example a button inside the panel).
   */
  readonly dismissible: Signal<boolean>;
  readonly resolvedPanelId: Signal<string>;
  readonly resolvedControlsId: Signal<string>;
  /**
   * Normalized swipe-to-dismiss progress, between `0` (no swipe) and `1`
   * (drawer dragged by its full size in the dismiss direction). Updated by
   * `bdDrawerContent` while the user drags; consumed by `bdDrawerOverlay`
   * to dim the backdrop in sync with the drawer.
   */
  readonly swipeDismissProgress: WritableSignal<number>;
  /** True while the user is actively dragging the drawer past the start threshold. */
  readonly isDragging: WritableSignal<boolean>;
}

/** Provided by `[bdDrawerRoot]` as `useExisting`; omit when wiring pieces standalone. */
export const BETTER_DRAWER_ROOT = new InjectionToken<BetterDrawerRootContext>('BetterDrawerRoot');
