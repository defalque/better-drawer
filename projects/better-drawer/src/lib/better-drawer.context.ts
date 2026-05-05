import { InjectionToken, type ModelSignal, type Signal } from '@angular/core';
import type { BetterDrawerDirection } from './better-drawer.types';

/** Stateful API from `[bdDrawerRoot]` for `bdDrawerContent`, `bdDrawerOverlay`, and `bdDrawerTrigger`. */
export interface BetterDrawerRootContext {
  readonly open: ModelSignal<boolean>;
  readonly direction: Signal<BetterDrawerDirection>;
  readonly modal: Signal<boolean>;
  readonly resolvedPanelId: Signal<string>;
  readonly resolvedControlsId: Signal<string>;
}

/** Provided by `[bdDrawerRoot]` as `useExisting`; omit when wiring pieces standalone. */
export const BETTER_DRAWER_ROOT = new InjectionToken<BetterDrawerRootContext>(
  'BetterDrawerRoot',
);
