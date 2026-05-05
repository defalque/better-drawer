import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  Directive,
  effect,
  ElementRef,
  inject,
  input,
  model,
  signal,
  untracked,
} from '@angular/core';
import { BetterDrawerDirection } from './better-drawer.types';
import { BETTER_DRAWER_ROOT, type BetterDrawerRootContext } from './better-drawer.context';

let betterDrawerTitleSeq = 0;
let betterDrawerPanelSeq = 0;

type SwipeDismissAxis = 'vertical' | 'horizontal';

function swipeAxisAndSign(position: BetterDrawerDirection): {
  axis: SwipeDismissAxis;
  /** When true, dismiss drag increases clientX/clientY from the pointer-down origin. */
  positiveDismiss: boolean;
} {
  switch (position) {
    case 'bottom':
      return { axis: 'vertical', positiveDismiss: true };
    case 'top':
      return { axis: 'vertical', positiveDismiss: false };
    case 'right':
      return { axis: 'horizontal', positiveDismiss: true };
    case 'left':
      return { axis: 'horizontal', positiveDismiss: false };
    default: {
      const _exhaustive: never = position;
      return _exhaustive;
    }
  }
}

/**
 * Single source of truth for open state and shared drawer options.
 * Provide `panelId` / `controlsId` overrides here; descendants read them via injection.
 *
 * Use `class="contents"` on the host if you need no extra layout box.
 * Intended for one dialog panel per root (multiple triggers are fine).
 */
@Directive({
  selector: '[bdDrawerRoot]',
  providers: [{ provide: BETTER_DRAWER_ROOT, useExisting: BetterDrawerRoot }],
})
export class BetterDrawerRoot implements BetterDrawerRootContext {
  /** Whether the drawer and overlay are visible (bind with `[(open)]` on the root). */
  readonly open = model(false);
  /** Slide direction for the drawer. @default `left` */
  readonly direction = input<BetterDrawerDirection>('left');
  /** When true (default), the overlay blocks the page and the dialog is aria-modal. */
  readonly modal = input<boolean>(true);
  /** Optional DOM id for the dialog panel. When omitted, a stable auto id is assigned. */
  readonly panelId = input<string | undefined>(undefined);
  /** Optional id for trigger `aria-controls`. Defaults to the resolved dialog panel id. */
  readonly controlsId = input<string | undefined>(undefined);

  private readonly autoPanelId = `bd-drawer-panel-${++betterDrawerPanelSeq}`;
  readonly resolvedPanelId = computed(() => this.panelId() ?? this.autoPanelId);
  readonly resolvedControlsId = computed(() => this.controlsId() ?? this.resolvedPanelId());

  /** Shared swipe progress (0..1); written by `bdDrawerContent`, read by `bdDrawerOverlay`. */
  readonly swipeDismissProgress = signal(0);
  /** Shared dragging flag; lets the overlay disable its opacity transition during the drag. */
  readonly isDragging = signal(false);
}

@Component({
  selector: '[bdDrawerOverlay]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '',
  styleUrl: './overlay.css',
  host: {
    '[attr.data-modal]': 'dataModalAttr()',
    '[attr.aria-hidden]': 'true',
    '[style.opacity]': 'overlayOpacity()',
    '[style.transition]': 'overlayTransition()',
    '(click)': 'close()',
    '(document:keydown.escape)': 'onEscape($event)',
    'animate.enter': 'overlay-enter',
    'animate.leave': 'overlay-leave',
  },
})
export class BetterDrawerOverlay {
  private readonly drawerRoot = inject(BETTER_DRAWER_ROOT, { optional: true });

  /**
   * Two-way binding when this overlay sits outside `[bdDrawerRoot]`.
   * Inside a root, use `[(open)]` on `bdDrawerRoot` instead.
   */
  readonly open = model(false);

  /**
   * When not inside `[bdDrawerRoot]`. Matches root `modal` when rooted.
   * @default `true`
   */
  readonly modal = input<boolean>(true);

  protected readonly effectiveModal = computed(() => this.drawerRoot?.modal() ?? this.modal());

  protected readonly dataModalAttr = computed(() => (this.effectiveModal() ? 'true' : 'false'));

  /**
   * Inline opacity that mirrors `swipeDismissProgress` from the root while the
   * user drags the drawer. Returns `null` outside drag activity so the CSS
   * enter/leave classes own the rest of the lifecycle. Skipped for non-modal
   * overlays, which always stay invisible.
   */
  protected readonly overlayOpacity = computed<number | null>(() => {
    if (!this.drawerRoot || !this.effectiveModal()) {
      return null;
    }
    const dragging = this.drawerRoot.isDragging();
    const progress = this.drawerRoot.swipeDismissProgress();
    if (!dragging && progress === 0) {
      return null;
    }
    return Math.max(0, 1 - progress);
  });

  /** Disables the opacity transition while dragging so the backdrop tracks the finger 1:1. */
  protected readonly overlayTransition = computed<string | null>(() =>
    this.drawerRoot?.isDragging() ? 'none' : null,
  );

  /** Collapses the drawer and hides the backdrop (overlay click). */
  protected close(): void {
    (this.drawerRoot?.open ?? this.open).set(false);
  }

  /** Collapses the drawer (Escape while open). */
  protected onEscape(event: Event): void {
    const isOpen = this.drawerRoot ? this.drawerRoot.open() : this.open();
    if (!isOpen) {
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
  /** Unique DOM id; parent drawer sets `aria-labelledby` to this value. */
  readonly titleId = signal(`bd-drawer-title-${++betterDrawerTitleSeq}`);
}

@Directive({
  selector: '[bdDrawerTrigger]',
  host: {
    '[attr.aria-expanded]': 'ariaExpanded()',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-controls]': 'resolvedControlsId()',
    '(click)': 'onActivate($event)',
  },
})
export class BetterDrawerTrigger {
  private readonly drawerRoot = inject(BETTER_DRAWER_ROOT, { optional: true });
  private readonly host = inject(ElementRef<HTMLElement>);

  /**
   * Two-way binding when this trigger sits outside `[bdDrawerRoot]`.
   * Inside a root, use `[(open)]` on `bdDrawerRoot` instead.
   */
  readonly open = model(false);

  /**
   * `aria-controls` when not inside `[bdDrawerRoot]`.
   * Prefer `controlsId` / `panelId` on `bdDrawerRoot`.
   */
  readonly controlsId = input<string | undefined>(undefined);

  protected readonly resolvedControlsId = computed(() =>
    this.drawerRoot ? this.drawerRoot.resolvedControlsId() : this.controlsId(),
  );

  protected readonly ariaExpanded = computed(() => {
    const isOpen = this.drawerRoot ? this.drawerRoot.open() : this.open();
    return isOpen ? 'true' : 'false';
  });

  protected onActivate(event: Event): void {
    if (this.isDisabled()) {
      return;
    }
    const target = event.target as HTMLElement | null;
    if (target?.closest('a[href], area[href]')) {
      event.preventDefault();
    }
    if (this.drawerRoot) {
      this.drawerRoot.open.update((v) => !v);
      return;
    }
    this.open.update((v) => !v);
  }

  private isDisabled(): boolean {
    const el = this.host.nativeElement;
    if (
      el instanceof HTMLButtonElement ||
      el instanceof HTMLInputElement ||
      el instanceof HTMLSelectElement ||
      el instanceof HTMLTextAreaElement
    ) {
      return el.disabled;
    }
    return el.hasAttribute('disabled') || el.getAttribute('aria-disabled') === 'true';
  }
}

@Component({
  selector: '[bdDrawerContent]',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (effectiveDirection() === 'bottom') {
      <div aria-hidden="true" class="span"></div>
    }
    <ng-content />
    @if (effectiveDirection() === 'top') {
      <div aria-hidden="true" class="span"></div>
    }
  `,
  styleUrl: './drawer.css',
  host: {
    '[attr.id]': 'resolvedPanelId()',
    '[attr.role]': '"dialog"',
    '[attr.aria-labelledby]': 'ariaLabelledBy()',
    '[attr.aria-modal]': 'ariaModalAttr()',
    '[attr.tabindex]': '-1',
    '[attr.data-direction]': 'effectiveDirection()',
    '(click)': '$event.stopPropagation()',
    '(document:keydown.escape)': 'onEscape($event)',
    'animate.enter': 'drawer-enter',
    'animate.leave': 'drawer-leave',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerup)': 'onPointerUp()',
    '(pointercancel)': 'onPointerCancel()',
  },
})
export class BetterDrawerContent {
  private readonly drawerRoot = inject(BETTER_DRAWER_ROOT, { optional: true });
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly drawerTitle = contentChild(BetterDrawerTitle, { descendants: true });
  private readonly generatedPanelId = `bd-drawer-panel-${++betterDrawerPanelSeq}`;
  protected readonly ariaLabelledBy = computed(() => this.drawerTitle()?.titleId() ?? null);

  /**
   * Two-way binding when this panel sits outside `[bdDrawerRoot]`.
   * Inside a root, use `[(open)]` on `bdDrawerRoot` instead.
   */
  readonly open = model(false);
  /**
   * Slide direction when not inside `[bdDrawerRoot]` (otherwise use inputs on `bdDrawerRoot`).
   * @default `left`.
   */
  readonly direction = input<BetterDrawerDirection>('left');
  /** When not inside `[bdDrawerRoot]`. @default `true` */
  readonly modal = input<boolean>(true);
  protected readonly effectiveDirection = computed(
    () => this.drawerRoot?.direction() ?? this.direction(),
  );
  protected readonly effectiveModal = computed(() => this.drawerRoot?.modal() ?? this.modal());
  protected readonly ariaModalAttr = computed(() => (this.effectiveModal() ? 'true' : null));

  /** Optional DOM id when standalone; prefer `panelId` on `bdDrawerRoot` when rooted. */
  readonly panelId = input<string | undefined>(undefined);
  protected readonly resolvedPanelId = computed(() =>
    this.drawerRoot ? this.drawerRoot.resolvedPanelId() : (this.panelId() ?? this.generatedPanelId),
  );

  constructor() {
    effect(() => {
      const isOpen = this.drawerRoot ? this.drawerRoot.open() : this.open();
      if (!isOpen) {
        return;
      }
      untracked(() => {
        queueMicrotask(() => this.host.nativeElement.focus({ preventScroll: true }));
      });
    });
  }

  protected close(): void {
    (this.drawerRoot?.open ?? this.open).set(false);
  }

  protected onEscape(event: Event): void {
    const isOpen = this.drawerRoot ? this.drawerRoot.open() : this.open();
    if (!isOpen) {
      return;
    }
    event.preventDefault();
    this.close();
  }

  /** True once the user has passed the drag threshold and is actively swiping. */
  isDragging = signal(false);
  private tracking = false;
  private startX = 0;
  private startY = 0;
  private pointerId = -1;
  /** Drawer size along the swipe axis, captured on `pointerdown` to normalize swipe progress. */
  private swipeSize = 0;
  private readonly dragStartThreshold = 0;
  /**
   * Fraction of the drawer's swipe-axis size the user must drag past to dismiss.
   * Combined with `swipeCloseMinPx` so very small drawers still need a meaningful drag.
   */
  private readonly swipeCloseFraction = 0.25;
  /** Lower bound for the dismiss threshold, used when the fraction-based value would be too small. */
  private readonly swipeCloseMinPx = 60;

  protected readonly swipeAxisAndSign = computed(() => swipeAxisAndSign(this.effectiveDirection()));

  private setDragging(value: boolean) {
    this.isDragging.set(value);
    this.drawerRoot?.isDragging.set(value);
  }

  private setDismissProgress(value: number) {
    this.drawerRoot?.swipeDismissProgress.set(value);
  }

  /**
   * Starts tracking the pointer down event.
   * @param event - The pointer down event object.
   */
  onPointerDown(event: PointerEvent) {
    this.tracking = true;
    this.startX = event.clientX;
    this.startY = event.clientY;
    this.pointerId = event.pointerId;

    const rect = this.host.nativeElement.getBoundingClientRect();
    this.swipeSize = this.swipeAxisAndSign().axis === 'vertical' ? rect.height : rect.width;
  }
  /**
   * Updates the drawer position when the pointer moves.
   * @param event - The pointer move event object.
   */
  onPointerMove(event: PointerEvent) {
    if (!this.tracking && !this.isDragging()) return;

    const el = this.host.nativeElement;
    const { axis, positiveDismiss } = this.swipeAxisAndSign();
    const raw = axis === 'vertical' ? event.clientY - this.startY : event.clientX - this.startX;
    const dragDelta = positiveDismiss ? Math.max(0, raw) : Math.min(0, raw);

    if (!this.isDragging()) {
      const passed =
        this.dragStartThreshold > 0
          ? positiveDismiss
            ? raw >= this.dragStartThreshold
            : raw <= -this.dragStartThreshold
          : positiveDismiss
            ? raw > 0
            : raw < 0;
      if (passed) {
        this.setDragging(true);
        el.setPointerCapture(this.pointerId);
      }
      return;
    }

    el.style.translate = axis === 'vertical' ? `0 ${dragDelta}px` : `${dragDelta}px 0`;

    if (this.swipeSize > 0) {
      this.setDismissProgress(Math.min(1, Math.abs(dragDelta) / this.swipeSize));
    }
  }
  /**
   * Ends tracking the pointer up event and dismisses the drawer if the pointer has moved beyond the swipe threshold.
   */
  onPointerUp() {
    this.tracking = false;

    if (!this.isDragging()) return;
    this.setDragging(false);

    const el = this.host.nativeElement;

    const t = el.style.translate?.trim() ?? '';
    const parts = t ? t.split(/\s+/) : [];
    const dx = parseFloat(parts[0] ?? '0') || 0;
    const dy = parseFloat(parts[1] ?? '0') || 0;

    try {
      el.releasePointerCapture(this.pointerId);
    } catch {
      /* pointer already released */
    }

    const { axis, positiveDismiss } = this.swipeAxisAndSign();
    const delta = axis === 'vertical' ? dy : dx;
    const dismissThreshold = Math.max(
      this.swipeCloseMinPx,
      this.swipeSize * this.swipeCloseFraction,
    );
    const shouldDismiss = positiveDismiss ? delta >= dismissThreshold : delta <= -dismissThreshold;

    if (shouldDismiss) {
      this.setDismissProgress(0);
      this.close();
    } else {
      el.style.transition = 'translate 500ms cubic-bezier(0.32, 0.72, 0, 1)';
      el.style.translate = '0 0';
      this.setDismissProgress(0);
      const cleanup = () => {
        el.style.transition = '';
        el.style.translate = '';
      };
      el.addEventListener('transitionend', cleanup, { once: true });
      setTimeout(cleanup, 450);
    }
  }
  /**
   * Ends tracking the pointer cancel event and resets the drawer position.
   */
  onPointerCancel() {
    this.tracking = false;

    if (!this.isDragging()) return;
    this.setDragging(false);

    const el = this.host.nativeElement;
    el.style.translate = '';
    this.setDismissProgress(0);

    try {
      el.releasePointerCapture(this.pointerId);
    } catch {
      /* pointer already released */
    }
  }
}
