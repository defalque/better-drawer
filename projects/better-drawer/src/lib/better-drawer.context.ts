import { InjectionToken, type ModelSignal, type Signal, type WritableSignal } from '@angular/core';
import type { BetterDrawerDirection } from './better-drawer.types';

/** Stateful API from `[bdDrawerRoot]` for `bdDrawerContent`, `bdDrawerOverlay`, `bdDrawerTrigger` and `bdDrawerPortal`. */
export interface BetterDrawerRootContext {
  /** Whether the drawer and overlay are visible (bind with `[(open)]` on the root). */
  readonly open: ModelSignal<boolean>;
  /** Slide direction for the drawer. @default `bottom` */
  readonly direction: Signal<BetterDrawerDirection>;
  /** When true (default), the overlay blocks the page and the dialog is aria-modal. */
  readonly modal: Signal<boolean>;
  /**
   * When false, the drawer cannot be closed via overlay click, swipe-to-dismiss,
   * or Escape; callers still close by updating `open` (for example a button inside the panel).
   */
  readonly dismissible: Signal<boolean>;
  /**
   * When true, omit the decorative pill handle (`.bar`) on `bdDrawerContent`
   * for `top` / `bottom` drawers.
   */
  readonly hideHandleBar: Signal<boolean>;

  /** Depth in nested `[bdDrawerRoot]` trees; `0` for the outermost root. */
  readonly nestingLevel: Signal<number>;
  /** Optional DOM id for the dialog panel. When omitted, a stable auto id is assigned. */
  readonly resolvedPanelId: Signal<string>;
  /** Optional id for trigger `aria-controls`. Defaults to the resolved dialog panel id. */
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
  /**
   * Whether an open drawer panel with a higher nesting level exists inside this
   * root (used to ignore Escape and swipe from an outer instance while a nested
   * drawer is active).
   */
  descendantOpenDrawerWithHigherNesting(): boolean;
  /** Records the element that should receive focus when the drawer closes. */
  registerFocusReturnTarget(element: HTMLElement): void;
  /** Request visible focus restore when the drawer closes (Escape dismiss only). */
  requestFocusRestoreOnClose(): void;
}

/** Provided by `[bdDrawerRoot]` as `useExisting`; omit when wiring pieces standalone. */
export const BETTER_DRAWER_ROOT = new InjectionToken<BetterDrawerRootContext>('BetterDrawerRoot');
