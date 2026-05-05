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
import {
  BETTER_DRAWER_ROOT,
  type BetterDrawerRootContext,
} from './better-drawer.context';

let betterDrawerTitleSeq = 0;
let betterDrawerPanelSeq = 0;

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
  /** Whether the drawer is modal */
  readonly modal = input<boolean>(false);
  /** Optional DOM id for the dialog panel. When omitted, a stable auto id is assigned. */
  readonly panelId = input<string | undefined>(undefined);
  /** Optional id for trigger `aria-controls`. Defaults to the resolved dialog panel id. */
  readonly controlsId = input<string | undefined>(undefined);

  private readonly autoPanelId = `bd-drawer-panel-${++betterDrawerPanelSeq}`;
  readonly resolvedPanelId = computed(() => this.panelId() ?? this.autoPanelId);
  readonly resolvedControlsId = computed(() => this.controlsId() ?? this.resolvedPanelId());
}

@Component({
  selector: '[bdDrawerOverlay]',
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
  private readonly drawerRoot = inject(BETTER_DRAWER_ROOT, { optional: true });

  /**
   * Two-way binding when this overlay sits outside `[bdDrawerRoot]`.
   * Inside a root, use `[(open)]` on `bdDrawerRoot` instead.
   */
  readonly open = model(false);

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
  /** Whether the drawer is modal when not inside `[bdDrawerRoot]`. */
  readonly modal = input<boolean>(false);
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
}
