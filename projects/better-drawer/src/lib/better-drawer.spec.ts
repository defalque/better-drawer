import { Component, model, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  BetterDrawerCloseButton,
  BetterDrawerContent,
  BetterDrawerPortal,
  BetterDrawerRoot,
  BetterDrawerOverlay,
  BetterDrawerTitle,
  BetterDrawerTrigger,
} from './better-drawer';
import { BetterDrawerDirection } from './better-drawer.types';

@Component({
  standalone: true,
  imports: [BetterDrawerOverlay],
  template: `<div bdDrawerOverlay [(open)]="open"></div>`,
})
class OverlayHostComponent {
  readonly open = model(false);
}

@Component({
  standalone: true,
  imports: [BetterDrawerContent, BetterDrawerTitle],
  template: `
    <aside bdDrawerContent [(open)]="drawerOpen" [direction]="direction()">
      <h2 bdDrawerTitle data-testid="drawer-heading">Title</h2>
      <span data-testid="projected">drawer body</span>
    </aside>
  `,
})
class DrawerHostComponent {
  readonly drawerOpen = model(false);
  readonly direction = signal<BetterDrawerDirection>('left');
}

@Component({
  imports: [BetterDrawerContent],
  template: `
    <aside bdDrawerContent [(open)]="drawerOpen">
      <span data-testid="projected">drawer body</span>
    </aside>
  `,
})
class DrawerNoTitleHostComponent {
  readonly drawerOpen = model(false);
}

@Component({
  imports: [BetterDrawerContent, BetterDrawerTitle],
  template: `
    <aside bdDrawerContent [(open)]="drawerOpen" panelId="fixed-panel-id">
      <h2 bdDrawerTitle data-testid="drawer-heading">Title</h2>
      <span data-testid="projected">drawer body</span>
    </aside>
  `,
})
class DrawerWithPanelIdHostComponent {
  readonly drawerOpen = model(false);
}

@Component({
  imports: [BetterDrawerContent, BetterDrawerTitle],
  template: `
    <aside bdDrawerContent [(open)]="drawerOpen" [modal]="false" [direction]="direction()">
      <h2 bdDrawerTitle data-testid="drawer-heading">Title</h2>
    </aside>
  `,
})
class DrawerNonModalHostComponent {
  readonly drawerOpen = model(false);
  readonly direction = signal<BetterDrawerDirection>('left');
}

@Component({
  standalone: true,
  imports: [BetterDrawerOverlay],
  template: `<div bdDrawerOverlay [(open)]="open" [modal]="false" data-testid="overlay"></div>`,
})
class OverlayNonModalHostComponent {
  readonly open = model(false);
}

@Component({
  imports: [BetterDrawerTrigger],
  template: `
    <button
      bdDrawerTrigger
      type="button"
      [(open)]="drawerOpen"
      data-testid="trigger"
      [controlsId]="panelId()"
    ></button>
  `,
})
class TriggerOnlyHostComponent {
  readonly drawerOpen = model(false);
  readonly panelId = signal<string | undefined>('test-panel-id');
}

@Component({
  imports: [BetterDrawerTrigger],
  template: `
    <button
      bdDrawerTrigger
      type="button"
      [(open)]="drawerOpen"
      [disabled]="true"
      data-testid="trigger"
    ></button>
  `,
})
class TriggerDisabledHostComponent {
  readonly drawerOpen = model(false);
}

@Component({
  imports: [BetterDrawerTrigger],
  template: `<button
    bdDrawerTrigger
    type="button"
    [(open)]="drawerOpen"
    data-testid="trigger"
  ></button>`,
})
class TriggerBareComponent {
  readonly drawerOpen = model(false);
}

@Component({
  imports: [BetterDrawerRoot, BetterDrawerTrigger, BetterDrawerContent, BetterDrawerTitle],
  template: `
    <div bdDrawerRoot [(open)]="drawerOpen">
      <button type="button" bdDrawerTrigger data-testid="trigger"></button>
      <aside bdDrawerContent data-testid="panel">
        <h2 bdDrawerTitle data-testid="drawer-heading">Title</h2>
      </aside>
    </div>
  `,
})
class DrawerGroupHostComponent {
  readonly drawerOpen = model(false);
}

@Component({
  standalone: true,
  imports: [BetterDrawerRoot, BetterDrawerContent, BetterDrawerTitle],
  template: `
    <div bdDrawerRoot [(open)]="drawerOpen" direction="bottom">
      <aside bdDrawerContent data-testid="panel">
        <h2 bdDrawerTitle>Title</h2>
      </aside>
    </div>
  `,
})
class DrawerGroupDirectionHostComponent {
  readonly drawerOpen = model(false);
}

@Component({
  standalone: true,
  imports: [BetterDrawerRoot, BetterDrawerContent, BetterDrawerTitle],
  template: `
    <div bdDrawerRoot [(open)]="drawerOpen" direction="bottom" [hideHandleBar]="true">
      <aside bdDrawerContent data-testid="panel">
        <h2 bdDrawerTitle>Title</h2>
      </aside>
    </div>
  `,
})
class DrawerBottomhideHandleBarHostComponent {
  readonly drawerOpen = model(false);
}

@Component({
  standalone: true,
  imports: [BetterDrawerRoot, BetterDrawerOverlay, BetterDrawerContent, BetterDrawerTitle],
  template: `
    <div bdDrawerRoot [(open)]="drawerOpen">
      <div bdDrawerOverlay data-testid="overlay"></div>
      <aside bdDrawerContent data-testid="panel">
        <h2 bdDrawerTitle>Title</h2>
      </aside>
    </div>
  `,
})
class DrawerRootWithOverlayComponent {
  readonly drawerOpen = model(false);
}

@Component({
  standalone: true,
  imports: [BetterDrawerRoot, BetterDrawerOverlay, BetterDrawerContent, BetterDrawerTitle],
  template: `
    <div bdDrawerRoot [(open)]="drawerOpen" [modal]="false">
      <div bdDrawerOverlay data-testid="overlay"></div>
      <aside bdDrawerContent data-testid="panel">
        <h2 bdDrawerTitle>Title</h2>
      </aside>
    </div>
  `,
})
class DrawerRootNonModalOverlayComponent {
  readonly drawerOpen = model(false);
}

@Component({
  standalone: true,
  imports: [BetterDrawerRoot, BetterDrawerOverlay, BetterDrawerContent, BetterDrawerTitle],
  template: `
    <div bdDrawerRoot [(open)]="outerOpen">
      @if (outerOpen()) {
        <div data-testid="outer-overlay" bdDrawerOverlay></div>
        <aside data-testid="outer-panel" bdDrawerContent direction="bottom">
          <h2 bdDrawerTitle>Outer</h2>
          <div bdDrawerRoot [(open)]="innerOpen">
            @if (innerOpen()) {
              <div data-testid="inner-overlay" bdDrawerOverlay></div>
              <aside data-testid="inner-panel" bdDrawerContent direction="bottom">
                <h2 bdDrawerTitle>Inner</h2>
              </aside>
            }
          </div>
        </aside>
      }
    </div>
  `,
})
class NestedDrawersHostComponent {
  readonly outerOpen = model(true);
  readonly innerOpen = model(true);
}

@Component({
  standalone: true,
  imports: [BetterDrawerRoot, BetterDrawerOverlay, BetterDrawerContent, BetterDrawerTitle],
  template: `
    <div bdDrawerRoot [(open)]="drawerOpen" [dismissible]="false">
      <div bdDrawerOverlay data-testid="overlay"></div>
      <aside bdDrawerContent data-testid="panel">
        <h2 bdDrawerTitle>Title</h2>
        <button type="button" data-testid="close-inside" (click)="drawerOpen.set(false)">
          Close
        </button>
      </aside>
    </div>
  `,
})
class DrawerRootNonDismissibleComponent {
  readonly drawerOpen = model(false);
}

@Component({
  standalone: true,
  imports: [BetterDrawerRoot, BetterDrawerContent, BetterDrawerTitle],
  template: `
    <div bdDrawerRoot [(open)]="drawerOpen" direction="bottom">
      <aside bdDrawerContent data-testid="panel">
        <section data-testid="scrollable" style="height: 100px; overflow-y: auto">
          <h2 bdDrawerTitle>Title</h2>
          <p>Scrollable content</p>
        </section>
      </aside>
    </div>
  `,
})
class DrawerRootWithScrollableContentComponent {
  readonly drawerOpen = model(false);
}

@Component({
  standalone: true,
  imports: [BetterDrawerRoot, BetterDrawerContent, BetterDrawerTitle],
  template: `
    <div bdDrawerRoot [(open)]="drawerOpen" direction="top">
      <aside bdDrawerContent data-testid="panel">
        <section data-testid="scrollable" style="height: 100px; overflow-y: auto">
          <h2 bdDrawerTitle>Title</h2>
          <p>Scrollable content</p>
        </section>
      </aside>
    </div>
  `,
})
class DrawerRootTopWithScrollableContentComponent {
  readonly drawerOpen = model(false);
}

@Component({
  standalone: true,
  imports: [BetterDrawerRoot, BetterDrawerContent, BetterDrawerTitle],
  template: `
    <div bdDrawerRoot [(open)]="drawerOpen" direction="right">
      <aside bdDrawerContent data-testid="panel">
        <section data-testid="scrollable" style="width: 100px; overflow-x: auto">
          <h2 bdDrawerTitle>Title</h2>
          <p style="width: 300px">Scrollable content</p>
        </section>
      </aside>
    </div>
  `,
})
class DrawerRootRightWithScrollableContentComponent {
  readonly drawerOpen = model(false);
}

@Component({
  standalone: true,
  imports: [BetterDrawerRoot, BetterDrawerContent, BetterDrawerTitle, BetterDrawerCloseButton],
  template: `
    <div bdDrawerRoot [(open)]="drawerOpen">
      <aside bdDrawerContent data-testid="panel">
        <h2 bdDrawerTitle>Title</h2>
        <button type="button" bdDrawerCloseButton data-testid="close-btn"></button>
      </aside>
    </div>
  `,
})
class CloseButtonInRootHostComponent {
  readonly drawerOpen = model(false);
}

@Component({
  standalone: true,
  imports: [BetterDrawerCloseButton],
  template: `
    <button
      type="button"
      bdDrawerCloseButton
      [(open)]="drawerOpen"
      data-testid="close-btn"
    ></button>
  `,
})
class CloseButtonStandaloneHostComponent {
  readonly drawerOpen = model(true);
}

@Component({
  standalone: true,
  imports: [
    BetterDrawerRoot,
    BetterDrawerOverlay,
    BetterDrawerContent,
    BetterDrawerTitle,
    BetterDrawerCloseButton,
  ],
  template: `
    <div bdDrawerRoot [(open)]="drawerOpen" [dismissible]="false">
      <div bdDrawerOverlay data-testid="overlay"></div>
      <aside bdDrawerContent data-testid="panel">
        <h2 bdDrawerTitle>Title</h2>
        <button type="button" bdDrawerCloseButton data-testid="close-btn"></button>
      </aside>
    </div>
  `,
})
class CloseButtonNonDismissibleHostComponent {
  readonly drawerOpen = model(true);
}

@Component({
  standalone: true,
  imports: [BetterDrawerRoot, BetterDrawerContent, BetterDrawerTitle, BetterDrawerCloseButton],
  template: `
    <div bdDrawerRoot [(open)]="outerOpen">
      @if (outerOpen()) {
        <aside data-testid="outer-panel" bdDrawerContent direction="bottom">
          <h2 bdDrawerTitle>Outer</h2>
          <button type="button" bdDrawerCloseButton data-testid="outer-close"></button>
          <div bdDrawerRoot [(open)]="innerOpen">
            @if (innerOpen()) {
              <aside data-testid="inner-panel" bdDrawerContent direction="bottom">
                <h2 bdDrawerTitle>Inner</h2>
              </aside>
            }
          </div>
        </aside>
      }
    </div>
  `,
})
class CloseButtonNestedHostComponent {
  readonly outerOpen = model(true);
  readonly innerOpen = model(true);
}

@Component({
  standalone: true,
  imports: [BetterDrawerPortal],
  template: `
    <ng-template bdDrawerPortal>
      <p data-testid="portal-content">Portal content</p>
    </ng-template>
  `,
})
class PortalHostComponent {}

@Component({
  standalone: true,
  imports: [BetterDrawerRoot, BetterDrawerTrigger, BetterDrawerContent, BetterDrawerTitle],
  template: `
    <div bdDrawerRoot [(open)]="drawerOpen" panelId="custom-panel" controlsId="custom-controls">
      <button type="button" bdDrawerTrigger data-testid="trigger"></button>
      <aside bdDrawerContent data-testid="panel">
        <h2 bdDrawerTitle>Title</h2>
      </aside>
    </div>
  `,
})
class DrawerRootCustomIdsHostComponent {
  readonly drawerOpen = model(false);
}

@Component({
  standalone: true,
  imports: [BetterDrawerRoot, BetterDrawerContent, BetterDrawerTitle],
  template: `
    <div bdDrawerRoot [(open)]="drawerOpen" direction="top">
      <aside bdDrawerContent data-testid="panel">
        <h2 bdDrawerTitle>Title</h2>
      </aside>
    </div>
  `,
})
class DrawerRootTopHandleHostComponent {
  readonly drawerOpen = model(false);
}

@Component({
  standalone: true,
  imports: [BetterDrawerRoot, BetterDrawerContent, BetterDrawerTitle],
  template: `
    <div bdDrawerRoot [(open)]="drawerOpen" direction="left">
      <aside bdDrawerContent data-testid="panel">
        <h2 bdDrawerTitle>Title</h2>
      </aside>
    </div>
  `,
})
class DrawerRootLeftHostComponent {
  readonly drawerOpen = model(false);
}

@Component({
  standalone: true,
  imports: [BetterDrawerContent, BetterDrawerTitle],
  template: `
    <aside bdDrawerContent [(open)]="drawerOpen" direction="bottom" [hideHandleBar]="true">
      <h2 bdDrawerTitle>Title</h2>
    </aside>
  `,
})
class DrawerStandaloneHideHandleHostComponent {
  readonly drawerOpen = model(false);
}

@Component({
  imports: [BetterDrawerTrigger],
  template: `
    <button type="button" bdDrawerTrigger [(open)]="drawerOpen" data-testid="trigger">
      <a href="#section" data-testid="anchor">Open</a>
    </button>
  `,
})
class TriggerAnchorHostComponent {
  readonly drawerOpen = model(false);
}

@Component({
  imports: [BetterDrawerTrigger],
  template: `
    <div
      bdDrawerTrigger
      role="button"
      tabindex="0"
      [(open)]="drawerOpen"
      data-testid="trigger"
      aria-disabled="true"
    ></div>
  `,
})
class TriggerAriaDisabledHostComponent {
  readonly drawerOpen = model(false);
}

async function flushMicrotasks(): Promise<void> {
  await Promise.resolve();
  await Promise.resolve();
}

function mockPanelSwipeRect(panel: HTMLElement, width: number, height: number): void {
  panel.getBoundingClientRect = (): DOMRect =>
    ({
      width,
      height,
      top: 0,
      left: 0,
      right: width,
      bottom: height,
      x: 0,
      y: 0,
      toJSON() {
        return {};
      },
    }) as DOMRect;
  panel.setPointerCapture = vi.fn();
  panel.releasePointerCapture = vi.fn();
}

function pointerSwipe(
  target: HTMLElement,
  opts: { startX: number; startY: number; endX: number; endY: number; pointerId?: number },
): void {
  const pid = opts.pointerId ?? 1;
  const midX = opts.startX + (opts.endX - opts.startX) / 2;
  const midY = opts.startY + (opts.endY - opts.startY) / 2;
  target.dispatchEvent(
    new PointerEvent('pointerdown', {
      bubbles: true,
      clientX: opts.startX,
      clientY: opts.startY,
      pointerId: pid,
    }),
  );
  target.dispatchEvent(
    new PointerEvent('pointermove', {
      bubbles: true,
      clientX: midX,
      clientY: midY,
      pointerId: pid,
    }),
  );
  target.dispatchEvent(
    new PointerEvent('pointermove', {
      bubbles: true,
      clientX: opts.endX,
      clientY: opts.endY,
      pointerId: pid,
    }),
  );
  target.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: pid }));
}

function touchDrag(
  target: HTMLElement,
  opts: { startX: number; startY: number; endX: number; endY: number; identifier?: number },
): void {
  const id = opts.identifier ?? 1;
  const midX = opts.startX + (opts.endX - opts.startX) / 2;
  const midY = opts.startY + (opts.endY - opts.startY) / 2;
  target.dispatchEvent(
    touchEvent('touchstart', { identifier: id, clientX: opts.startX, clientY: opts.startY }),
  );
  target.dispatchEvent(touchEvent('touchmove', { identifier: id, clientX: midX, clientY: midY }));
  target.dispatchEvent(
    touchEvent('touchmove', { identifier: id, clientX: opts.endX, clientY: opts.endY }),
  );
}

function touchSwipe(
  target: HTMLElement,
  opts: { startX: number; startY: number; endX: number; endY: number; identifier?: number },
): void {
  const id = opts.identifier ?? 1;
  const midX = opts.startX + (opts.endX - opts.startX) / 2;
  const midY = opts.startY + (opts.endY - opts.startY) / 2;
  target.dispatchEvent(
    touchEvent('touchstart', { identifier: id, clientX: opts.startX, clientY: opts.startY }),
  );
  target.dispatchEvent(touchEvent('touchmove', { identifier: id, clientX: midX, clientY: midY }));
  target.dispatchEvent(
    touchEvent('touchmove', { identifier: id, clientX: opts.endX, clientY: opts.endY }),
  );
  target.dispatchEvent(
    touchEvent('touchend', { identifier: id, clientX: opts.endX, clientY: opts.endY }),
  );
}

function mockReducedMotion(matches: boolean): void {
  vi.spyOn(window, 'matchMedia').mockImplementation(
    (query: string): MediaQueryList =>
      ({
        matches: query === '(prefers-reduced-motion: reduce)' ? matches : false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList,
  );
}

function touchEvent(
  type: 'touchstart' | 'touchmove' | 'touchend' | 'touchcancel',
  touch: Pick<Touch, 'identifier' | 'clientX' | 'clientY'>,
): TouchEvent {
  const event = new Event(type, { bubbles: true, cancelable: true }) as TouchEvent;
  Object.defineProperty(event, 'touches', {
    value: type === 'touchend' || type === 'touchcancel' ? [] : [touch],
  });
  Object.defineProperty(event, 'changedTouches', { value: [touch] });
  return event;
}

describe('BetterDrawerOverlay', () => {
  let fixture: ComponentFixture<OverlayHostComponent>;

  function overlayHost(): HTMLElement {
    const el = fixture.nativeElement as HTMLElement;
    return el.querySelector('[bdDrawerOverlay]') as HTMLElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverlayHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(OverlayHostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(overlayHost()).toBeTruthy();
  });

  it('sets open to false when the overlay host is clicked', () => {
    fixture.componentInstance.open.set(true);
    fixture.detectChanges();

    overlayHost().dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('sets open to false when Escape is pressed while open', () => {
    fixture.componentInstance.open.set(true);
    fixture.detectChanges();

    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
    );
    fixture.detectChanges();

    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('does not change open when Escape is pressed while closed', () => {
    fixture.componentInstance.open.set(false);
    fixture.detectChanges();

    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
    );
    fixture.detectChanges();

    expect(fixture.componentInstance.open()).toBe(false);
  });

  it('sets data-modal false on overlay host when modal is false', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [OverlayNonModalHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const nonModalFx = TestBed.createComponent(OverlayNonModalHostComponent);
    nonModalFx.detectChanges();
    nonModalFx.componentInstance.open.set(true);
    nonModalFx.detectChanges();

    const el = nonModalFx.nativeElement.querySelector('[data-testid="overlay"]') as HTMLElement;
    expect(el.getAttribute('data-modal')).toBe('false');
  });

  it('does not close the outer drawer when the inner drawer is open and the outer overlay is clicked', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [NestedDrawersHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(NestedDrawersHostComponent);
    fx.detectChanges();

    const outerOverlay = fx.nativeElement.querySelector(
      '[data-testid="outer-overlay"]',
    ) as HTMLElement;
    outerOverlay.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fx.detectChanges();

    expect(fx.componentInstance.outerOpen()).toBe(true);
    expect(fx.componentInstance.innerOpen()).toBe(true);
  });
});

describe('BetterDrawerContent', () => {
  let fixture: ComponentFixture<DrawerHostComponent>;

  function drawerEl(): HTMLElement {
    const el = fixture.nativeElement as HTMLElement;
    return el.querySelector('[bdDrawerContent]') as HTMLElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(DrawerHostComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(drawerEl()).toBeTruthy();
  });

  it('does not warn when bdDrawerTitle is present', async () => {
    const warnSpy = vi.spyOn(console, 'warn');
    fixture.componentInstance.drawerOpen.set(true);
    fixture.detectChanges();
    await Promise.resolve();
    expect(warnSpy).not.toHaveBeenCalled();
  });

  it('logs a console warning when opened without bdDrawerTitle', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [DrawerNoTitleHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const warnSpy = vi.spyOn(console, 'warn');
    const fx = TestBed.createComponent(DrawerNoTitleHostComponent);
    fx.detectChanges();
    fx.componentInstance.drawerOpen.set(true);
    fx.detectChanges();
    await Promise.resolve();
    expect(warnSpy).toHaveBeenCalledTimes(1);
    const message = warnSpy.mock.lastCall?.[0] as string;
    expect(message).toContain('[better-drawer]');
    expect(message).toContain('bdDrawerTitle');
  });

  it('logs again on a later open if the title is still missing', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [DrawerNoTitleHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const warnSpy = vi.spyOn(console, 'warn');
    const fx = TestBed.createComponent(DrawerNoTitleHostComponent);
    fx.detectChanges();
    fx.componentInstance.drawerOpen.set(true);
    fx.detectChanges();
    await Promise.resolve();
    fx.componentInstance.drawerOpen.set(false);
    fx.detectChanges();
    fx.componentInstance.drawerOpen.set(true);
    fx.detectChanges();
    await Promise.resolve();
    expect(warnSpy).toHaveBeenCalledTimes(2);
  });

  it('projects host element content into the drawer', () => {
    expect(drawerEl().querySelector('[data-testid="projected"]')?.textContent?.trim()).toBe(
      'drawer body',
    );
  });

  it('exposes role dialog on the host element', () => {
    expect(drawerEl().getAttribute('role')).toBe('dialog');
  });

  it('defaults aria-modal to true on the panel', () => {
    expect(drawerEl().getAttribute('aria-modal')).toBe('true');
  });

  it('sets aria-labelledby to the bdDrawerTitle element id', () => {
    const panel = drawerEl();
    const heading = panel.querySelector('[data-testid="drawer-heading"]') as HTMLElement;

    expect(heading.id).toMatch(/^bd-drawer-title-\d+$/);
    expect(panel.getAttribute('aria-labelledby')).toBe(heading.id);
  });

  it('sets a stable panel id for aria-controls linkage', () => {
    expect(drawerEl().id).toMatch(/^bd-drawer-panel-\d+$/);
  });

  it('uses panelId input as the dialog host id when provided', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [DrawerWithPanelIdHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const idFixture = TestBed.createComponent(DrawerWithPanelIdHostComponent);
    idFixture.detectChanges();
    const panel = idFixture.nativeElement.querySelector('[bdDrawerContent]') as HTMLElement;
    expect(panel.id).toBe('fixed-panel-id');
  });

  it('defaults direction to left on data-direction', () => {
    expect(drawerEl().getAttribute('data-direction')).toBe('left');
  });

  it('reflects direction input on data-direction', () => {
    const directions: BetterDrawerDirection[] = ['left', 'right', 'top', 'bottom'];

    for (const direction of directions) {
      fixture.componentInstance.direction.set(direction);
      fixture.detectChanges();

      expect(drawerEl().getAttribute('data-direction')).toBe(direction);
    }
  });

  it('does not close when the drawer host is clicked', () => {
    fixture.componentInstance.drawerOpen.set(true);
    fixture.detectChanges();

    drawerEl().dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fixture.detectChanges();

    expect(fixture.componentInstance.drawerOpen()).toBe(true);
  });

  it('sets open to false when Escape is pressed while open', () => {
    fixture.componentInstance.drawerOpen.set(true);
    fixture.detectChanges();

    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
    );
    fixture.detectChanges();

    expect(fixture.componentInstance.drawerOpen()).toBe(false);
  });

  it('does not change open when Escape is pressed while closed', () => {
    fixture.componentInstance.drawerOpen.set(false);
    fixture.detectChanges();

    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
    );
    fixture.detectChanges();

    expect(fixture.componentInstance.drawerOpen()).toBe(false);
  });

  it('omits aria-modal when modal is false', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [DrawerNonModalHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const nonModalFx = TestBed.createComponent(DrawerNonModalHostComponent);
    nonModalFx.detectChanges();
    const panel = nonModalFx.nativeElement.querySelector('[bdDrawerContent]') as HTMLElement;
    expect(panel.hasAttribute('aria-modal')).toBe(false);
  });

  it('focuses the panel when opened', async () => {
    fixture.componentInstance.drawerOpen.set(true);
    fixture.detectChanges();
    await flushMicrotasks();

    expect(document.activeElement).toBe(drawerEl());
  });

  it('reflects data-dismissible and data-bd-drawer-open on the host', () => {
    const panel = drawerEl();
    expect(panel.getAttribute('data-dismissible')).toBe('true');
    expect(panel.hasAttribute('data-bd-drawer-open')).toBe(false);

    fixture.componentInstance.drawerOpen.set(true);
    fixture.detectChanges();

    expect(panel.getAttribute('data-bd-drawer-open')).toBe('true');
  });

  it('omits the handle bar for left and right directions', () => {
    const directions: BetterDrawerDirection[] = ['left', 'right'];

    for (const direction of directions) {
      fixture.componentInstance.direction.set(direction);
      fixture.detectChanges();
      expect(drawerEl().querySelector('.bar')).toBeNull();
    }
  });

  it('omits the handle bar when hideHandleBar is true on standalone content', async () => {
    TestBed.resetTestingModule();
    await TestBed.configureTestingModule({
      imports: [DrawerStandaloneHideHandleHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(DrawerStandaloneHideHandleHostComponent);
    fx.detectChanges();
    const panel = fx.nativeElement.querySelector('[bdDrawerContent]') as HTMLElement;
    expect(panel.querySelector('.bar')).toBeNull();
  });
});

describe('BetterDrawerTrigger', () => {
  it('reflects accessibility state from open and controlsId', async () => {
    await TestBed.configureTestingModule({
      imports: [TriggerOnlyHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const trigFixture = TestBed.createComponent(TriggerOnlyHostComponent);
    trigFixture.detectChanges();

    const button = trigFixture.nativeElement.querySelector(
      '[data-testid="trigger"]',
    ) as HTMLElement;
    expect(button.getAttribute('aria-haspopup')).toBe('dialog');
    expect(button.getAttribute('aria-expanded')).toBe('false');
    expect(button.getAttribute('aria-controls')).toBe('test-panel-id');

    trigFixture.componentInstance.drawerOpen.set(true);
    trigFixture.detectChanges();
    expect(button.getAttribute('aria-expanded')).toBe('true');
  });

  it('toggles bound open on click when enabled', async () => {
    await TestBed.configureTestingModule({
      imports: [TriggerOnlyHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const trigFixture = TestBed.createComponent(TriggerOnlyHostComponent);
    trigFixture.detectChanges();

    const button = trigFixture.nativeElement.querySelector(
      '[data-testid="trigger"]',
    ) as HTMLElement;
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    trigFixture.detectChanges();
    expect(trigFixture.componentInstance.drawerOpen()).toBe(true);

    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    trigFixture.detectChanges();
    expect(trigFixture.componentInstance.drawerOpen()).toBe(false);
  });

  it('does not set aria-controls when controlsId is undefined', async () => {
    await TestBed.configureTestingModule({
      imports: [TriggerBareComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const trigFixture = TestBed.createComponent(TriggerBareComponent);
    trigFixture.detectChanges();

    const button = trigFixture.nativeElement.querySelector(
      '[data-testid="trigger"]',
    ) as HTMLElement;
    expect(button.hasAttribute('aria-controls')).toBe(false);
  });

  it('does not toggle open when disabled', async () => {
    await TestBed.configureTestingModule({
      imports: [TriggerDisabledHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const trigFixture = TestBed.createComponent(TriggerDisabledHostComponent);
    trigFixture.detectChanges();

    const button = trigFixture.nativeElement.querySelector(
      '[data-testid="trigger"]',
    ) as HTMLElement;
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    trigFixture.detectChanges();
    expect(trigFixture.componentInstance.drawerOpen()).toBe(false);
  });

  it('calls preventDefault when activated via a nested anchor', async () => {
    await TestBed.configureTestingModule({
      imports: [TriggerAnchorHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(TriggerAnchorHostComponent);
    fx.detectChanges();

    const anchor = fx.nativeElement.querySelector('[data-testid="anchor"]') as HTMLAnchorElement;
    const click = new MouseEvent('click', { bubbles: true, cancelable: true });
    const preventSpy = vi.spyOn(click, 'preventDefault');
    anchor.dispatchEvent(click);
    fx.detectChanges();

    expect(preventSpy).toHaveBeenCalled();
    expect(fx.componentInstance.drawerOpen()).toBe(true);
  });

  it('does not toggle open when aria-disabled is true on a non-form host', async () => {
    await TestBed.configureTestingModule({
      imports: [TriggerAriaDisabledHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(TriggerAriaDisabledHostComponent);
    fx.detectChanges();

    const trigger = fx.nativeElement.querySelector('[data-testid="trigger"]') as HTMLElement;
    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fx.detectChanges();

    expect(fx.componentInstance.drawerOpen()).toBe(false);
  });
});

describe('BetterDrawerRoot', () => {
  it('links trigger aria-controls to the drawer host id without manual panelId or controlsId', async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerGroupHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(DrawerGroupHostComponent);
    fx.detectChanges();

    const trigger = fx.nativeElement.querySelector('[data-testid="trigger"]') as HTMLElement;
    const panel = fx.nativeElement.querySelector('[data-testid="panel"]') as HTMLElement;

    expect(panel.id).toMatch(/^bd-drawer-panel-\d+$/);
    expect(trigger.getAttribute('aria-controls')).toBe(panel.id);
  });

  it('routes open state through the group model on trigger clicks', async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerGroupHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(DrawerGroupHostComponent);
    fx.detectChanges();
    expect(fx.componentInstance.drawerOpen()).toBe(false);

    const trigger = fx.nativeElement.querySelector('[data-testid="trigger"]') as HTMLElement;
    trigger.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fx.detectChanges();
    expect(fx.componentInstance.drawerOpen()).toBe(true);
  });

  it('inherits direction input from bdDrawerRoot on the drawer host', async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerGroupDirectionHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(DrawerGroupDirectionHostComponent);
    fx.detectChanges();
    expect(
      (fx.nativeElement.querySelector('[data-testid="panel"]') as HTMLElement).getAttribute(
        'data-direction',
      ),
    ).toBe('bottom');
  });

  it('renders the handle bar on bottom drawer by default', async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerGroupDirectionHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(DrawerGroupDirectionHostComponent);
    fx.detectChanges();
    const panel = fx.nativeElement.querySelector('[data-testid="panel"]') as HTMLElement;
    expect(panel.querySelector('.bar')).not.toBeNull();
  });

  it('omits the handle bar when root hideHandleBar is true', async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerBottomhideHandleBarHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(DrawerBottomhideHandleBarHostComponent);
    fx.detectChanges();
    const panel = fx.nativeElement.querySelector('[data-testid="panel"]') as HTMLElement;
    expect(panel.querySelector('.bar')).toBeNull();
  });

  it('sets data-modal true on overlay by default when modal is true', async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerRootWithOverlayComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(DrawerRootWithOverlayComponent);
    fx.detectChanges();
    fx.componentInstance.drawerOpen.set(true);
    fx.detectChanges();

    const overlay = fx.nativeElement.querySelector('[data-testid="overlay"]') as HTMLElement;
    expect(overlay.getAttribute('data-modal')).toBe('true');
  });

  it('sets data-modal false on overlay when root modal is false', async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerRootNonModalOverlayComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(DrawerRootNonModalOverlayComponent);
    fx.detectChanges();
    fx.componentInstance.drawerOpen.set(true);
    fx.detectChanges();

    const overlay = fx.nativeElement.querySelector('[data-testid="overlay"]') as HTMLElement;
    expect(overlay.getAttribute('data-modal')).toBe('false');
  });

  it('does not close from overlay click or Escape when dismissible is false', async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerRootNonDismissibleComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(DrawerRootNonDismissibleComponent);
    fx.detectChanges();
    fx.componentInstance.drawerOpen.set(true);
    fx.detectChanges();

    const overlay = fx.nativeElement.querySelector('[data-testid="overlay"]') as HTMLElement;
    overlay.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fx.detectChanges();
    expect(fx.componentInstance.drawerOpen()).toBe(true);

    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
    );
    fx.detectChanges();
    expect(fx.componentInstance.drawerOpen()).toBe(true);
  });

  it('still closes when open is set from inside the panel while dismissible is false', async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerRootNonDismissibleComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(DrawerRootNonDismissibleComponent);
    fx.detectChanges();
    fx.componentInstance.drawerOpen.set(true);
    fx.detectChanges();

    const closeBtn = fx.nativeElement.querySelector('[data-testid="close-inside"]') as HTMLElement;
    closeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fx.detectChanges();
    expect(fx.componentInstance.drawerOpen()).toBe(false);
  });

  it('does not swipe-dismiss when dismissible is false', async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerRootNonDismissibleComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(DrawerRootNonDismissibleComponent);
    fx.detectChanges();
    fx.componentInstance.drawerOpen.set(true);
    fx.detectChanges();

    const panel = fx.nativeElement.querySelector('[data-testid="panel"]') as HTMLElement;
    const pid = 42;
    panel.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        clientX: 200,
        clientY: 120,
        pointerId: pid,
      }),
    );
    panel.dispatchEvent(
      new PointerEvent('pointermove', {
        bubbles: true,
        clientX: -20,
        clientY: 120,
        pointerId: pid,
      }),
    );
    panel.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: pid }));
    fx.detectChanges();

    expect(fx.componentInstance.drawerOpen()).toBe(true);
    expect(panel.style.translate).toBe('');
  });

  it('does not swipe-dismiss from content revealed by a scrolled container', async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerRootWithScrollableContentComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(DrawerRootWithScrollableContentComponent);
    fx.detectChanges();
    fx.componentInstance.drawerOpen.set(true);
    fx.detectChanges();

    const panel = fx.nativeElement.querySelector('[data-testid="panel"]') as HTMLElement;
    const scrollable = fx.nativeElement.querySelector('[data-testid="scrollable"]') as HTMLElement;
    Object.defineProperty(scrollable, 'clientHeight', { configurable: true, value: 100 });
    Object.defineProperty(scrollable, 'scrollHeight', { configurable: true, value: 300 });
    Object.defineProperty(scrollable, 'scrollTop', { configurable: true, value: 80 });

    const pid = 42;
    scrollable.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        clientX: 200,
        clientY: 120,
        pointerId: pid,
      }),
    );
    scrollable.dispatchEvent(
      new PointerEvent('pointermove', {
        bubbles: true,
        clientX: 200,
        clientY: 220,
        pointerId: pid,
      }),
    );
    scrollable.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: pid }));
    fx.detectChanges();

    expect(fx.componentInstance.drawerOpen()).toBe(true);
    expect(panel.style.translate).toBe('');
  });

  it('swipe-dismisses with touch from scrollable content when it is still at the top', async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerRootWithScrollableContentComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(DrawerRootWithScrollableContentComponent);
    fx.detectChanges();
    fx.componentInstance.drawerOpen.set(true);
    fx.detectChanges();

    const scrollable = fx.nativeElement.querySelector('[data-testid="scrollable"]') as HTMLElement;
    Object.defineProperty(scrollable, 'clientHeight', { configurable: true, value: 100 });
    Object.defineProperty(scrollable, 'scrollHeight', { configurable: true, value: 300 });
    scrollable.scrollTop = 0;

    scrollable.dispatchEvent(
      touchEvent('touchstart', { identifier: 1, clientX: 200, clientY: 120 }),
    );
    const firstMove = touchEvent('touchmove', { identifier: 1, clientX: 200, clientY: 180 });
    scrollable.dispatchEvent(firstMove);
    scrollable.dispatchEvent(
      touchEvent('touchmove', { identifier: 1, clientX: 200, clientY: 250 }),
    );
    scrollable.dispatchEvent(touchEvent('touchend', { identifier: 1, clientX: 200, clientY: 250 }));
    fx.detectChanges();

    expect(firstMove.defaultPrevented).toBe(true);
    expect(fx.componentInstance.drawerOpen()).toBe(false);
  });

  it('does not swipe-dismiss a top drawer while scrollable content can still scroll down', async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerRootTopWithScrollableContentComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(DrawerRootTopWithScrollableContentComponent);
    fx.detectChanges();
    fx.componentInstance.drawerOpen.set(true);
    fx.detectChanges();

    const panel = fx.nativeElement.querySelector('[data-testid="panel"]') as HTMLElement;
    const scrollable = fx.nativeElement.querySelector('[data-testid="scrollable"]') as HTMLElement;
    Object.defineProperty(scrollable, 'clientHeight', { configurable: true, value: 100 });
    Object.defineProperty(scrollable, 'scrollHeight', { configurable: true, value: 300 });
    scrollable.scrollTop = 80;

    scrollable.dispatchEvent(
      touchEvent('touchstart', { identifier: 1, clientX: 200, clientY: 250 }),
    );
    scrollable.dispatchEvent(
      touchEvent('touchmove', { identifier: 1, clientX: 200, clientY: 120 }),
    );
    scrollable.dispatchEvent(touchEvent('touchend', { identifier: 1, clientX: 200, clientY: 120 }));
    fx.detectChanges();

    expect(fx.componentInstance.drawerOpen()).toBe(true);
    expect(panel.style.translate).toBe('');
  });

  it('swipe-dismisses a top drawer from scrollable content when it is at the bottom', async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerRootTopWithScrollableContentComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(DrawerRootTopWithScrollableContentComponent);
    fx.detectChanges();
    fx.componentInstance.drawerOpen.set(true);
    fx.detectChanges();

    const scrollable = fx.nativeElement.querySelector('[data-testid="scrollable"]') as HTMLElement;
    Object.defineProperty(scrollable, 'clientHeight', { configurable: true, value: 100 });
    Object.defineProperty(scrollable, 'scrollHeight', { configurable: true, value: 300 });
    Object.defineProperty(scrollable, 'scrollTop', { configurable: true, value: 200 });

    scrollable.dispatchEvent(
      touchEvent('touchstart', { identifier: 1, clientX: 200, clientY: 250 }),
    );
    const firstMove = touchEvent('touchmove', { identifier: 1, clientX: 200, clientY: 180 });
    scrollable.dispatchEvent(firstMove);
    scrollable.dispatchEvent(touchEvent('touchmove', { identifier: 1, clientX: 200, clientY: 90 }));
    scrollable.dispatchEvent(touchEvent('touchend', { identifier: 1, clientX: 200, clientY: 90 }));
    fx.detectChanges();

    expect(firstMove.defaultPrevented).toBe(true);
    expect(fx.componentInstance.drawerOpen()).toBe(false);
  });

  it('allows horizontal swipe-dismiss even when horizontal drawer content is scrolled', async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerRootRightWithScrollableContentComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(DrawerRootRightWithScrollableContentComponent);
    fx.detectChanges();
    fx.componentInstance.drawerOpen.set(true);
    fx.detectChanges();

    const scrollable = fx.nativeElement.querySelector('[data-testid="scrollable"]') as HTMLElement;
    Object.defineProperty(scrollable, 'clientWidth', { configurable: true, value: 100 });
    Object.defineProperty(scrollable, 'scrollWidth', { configurable: true, value: 300 });
    scrollable.scrollLeft = 80;

    scrollable.dispatchEvent(
      touchEvent('touchstart', { identifier: 1, clientX: 120, clientY: 200 }),
    );
    scrollable.dispatchEvent(
      touchEvent('touchmove', { identifier: 1, clientX: 250, clientY: 200 }),
    );
    scrollable.dispatchEvent(
      touchEvent('touchmove', { identifier: 1, clientX: 290, clientY: 200 }),
    );
    scrollable.dispatchEvent(touchEvent('touchend', { identifier: 1, clientX: 250, clientY: 200 }));
    fx.detectChanges();

    expect(fx.componentInstance.drawerOpen()).toBe(false);
  });

  it('stacks z-index so nested drawer overlay and panel sit above the parent', async () => {
    await TestBed.configureTestingModule({
      imports: [NestedDrawersHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(NestedDrawersHostComponent);
    fx.detectChanges();

    const outerPanel = fx.nativeElement.querySelector('[data-testid="outer-panel"]') as HTMLElement;
    const innerPanel = fx.nativeElement.querySelector('[data-testid="inner-panel"]') as HTMLElement;
    const outerOverlay = fx.nativeElement.querySelector(
      '[data-testid="outer-overlay"]',
    ) as HTMLElement;
    const innerOverlay = fx.nativeElement.querySelector(
      '[data-testid="inner-overlay"]',
    ) as HTMLElement;

    expect(parseInt(outerOverlay.style.zIndex, 10)).toBeLessThan(
      parseInt(innerOverlay.style.zIndex, 10),
    );
    expect(parseInt(outerPanel.style.zIndex, 10)).toBeLessThan(
      parseInt(innerPanel.style.zIndex, 10),
    );
    expect(parseInt(outerOverlay.style.zIndex, 10)).toBeLessThan(
      parseInt(outerPanel.style.zIndex, 10),
    );
  });

  it('does not swipe-track the outer panel when the nested panel is dragged', async () => {
    await TestBed.configureTestingModule({
      imports: [NestedDrawersHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(NestedDrawersHostComponent);
    fx.detectChanges();

    const outerPanel = fx.nativeElement.querySelector('[data-testid="outer-panel"]') as HTMLElement;
    const innerPanel = fx.nativeElement.querySelector('[data-testid="inner-panel"]') as HTMLElement;
    const innerHeading = innerPanel.querySelector('h2') as HTMLElement;
    const mockRect = (): DOMRect =>
      ({
        width: 320,
        height: 240,
        top: 400,
        left: 0,
        right: 320,
        bottom: 640,
        x: 0,
        y: 400,
        toJSON() {
          return {};
        },
      }) as DOMRect;
    innerPanel.getBoundingClientRect = mockRect;

    innerHeading.dispatchEvent(
      touchEvent('touchstart', { identifier: 1, clientX: 160, clientY: 440 }),
    );
    innerHeading.dispatchEvent(
      touchEvent('touchmove', { identifier: 1, clientX: 160, clientY: 460 }),
    );
    innerHeading.dispatchEvent(
      touchEvent('touchmove', { identifier: 1, clientX: 160, clientY: 480 }),
    );
    innerHeading.dispatchEvent(
      touchEvent('touchend', { identifier: 1, clientX: 160, clientY: 480 }),
    );
    fx.detectChanges();

    expect(fx.componentInstance.outerOpen()).toBe(true);
    expect(fx.componentInstance.innerOpen()).toBe(true);
    expect(outerPanel.style.translate).toBe('');
  });

  it('does not swipe-track the outer panel when swiping outside the nested panel', async () => {
    await TestBed.configureTestingModule({
      imports: [NestedDrawersHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(NestedDrawersHostComponent);
    fx.detectChanges();

    const outerPanel = fx.nativeElement.querySelector('[data-testid="outer-panel"]') as HTMLElement;
    const outerHeading = outerPanel.querySelector('h2') as HTMLElement;
    const mockRect = (): DOMRect =>
      ({
        width: 320,
        height: 400,
        top: 100,
        left: 0,
        right: 320,
        bottom: 500,
        x: 0,
        y: 100,
        toJSON() {
          return {};
        },
      }) as DOMRect;
    outerPanel.getBoundingClientRect = mockRect;

    outerHeading.dispatchEvent(
      touchEvent('touchstart', { identifier: 1, clientX: 160, clientY: 140 }),
    );
    outerHeading.dispatchEvent(
      touchEvent('touchmove', { identifier: 1, clientX: 160, clientY: 220 }),
    );
    outerHeading.dispatchEvent(
      touchEvent('touchmove', { identifier: 1, clientX: 160, clientY: 320 }),
    );
    outerHeading.dispatchEvent(
      touchEvent('touchend', { identifier: 1, clientX: 160, clientY: 320 }),
    );
    fx.detectChanges();

    expect(fx.componentInstance.outerOpen()).toBe(true);
    expect(fx.componentInstance.innerOpen()).toBe(true);
    expect(outerPanel.style.translate).toBe('');
  });

  it('closes the inner drawer first on Escape when nested', async () => {
    await TestBed.configureTestingModule({
      imports: [NestedDrawersHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(NestedDrawersHostComponent);
    fx.detectChanges();

    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
    );
    fx.detectChanges();

    expect(fx.componentInstance.innerOpen()).toBe(false);
    expect(fx.componentInstance.outerOpen()).toBe(true);

    document.dispatchEvent(
      new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, cancelable: true }),
    );
    fx.detectChanges();

    expect(fx.componentInstance.outerOpen()).toBe(false);
  });

  it('uses custom panelId and controlsId from the root on panel and trigger', async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerRootCustomIdsHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(DrawerRootCustomIdsHostComponent);
    fx.detectChanges();

    const panel = fx.nativeElement.querySelector('[data-testid="panel"]') as HTMLElement;
    const trigger = fx.nativeElement.querySelector('[data-testid="trigger"]') as HTMLElement;

    expect(panel.id).toBe('custom-panel');
    expect(trigger.getAttribute('aria-controls')).toBe('custom-controls');
  });

  it('renders the handle bar on top drawer by default', async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerRootTopHandleHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(DrawerRootTopHandleHostComponent);
    fx.detectChanges();
    const panel = fx.nativeElement.querySelector('[data-testid="panel"]') as HTMLElement;
    expect(panel.querySelector('.bar')).not.toBeNull();
  });

  it('sets data-bd-drawer-nest-level on nested panels', async () => {
    await TestBed.configureTestingModule({
      imports: [NestedDrawersHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(NestedDrawersHostComponent);
    fx.detectChanges();

    const outerPanel = fx.nativeElement.querySelector('[data-testid="outer-panel"]') as HTMLElement;
    const innerPanel = fx.nativeElement.querySelector('[data-testid="inner-panel"]') as HTMLElement;

    expect(outerPanel.getAttribute('data-bd-drawer-nest-level')).toBe('0');
    expect(innerPanel.getAttribute('data-bd-drawer-nest-level')).toBe('1');
  });
});

describe('swipe-to-dismiss', () => {
  async function openDrawerWithOverlay(): Promise<{
    fx: ComponentFixture<DrawerRootWithOverlayComponent>;
    panel: HTMLElement;
    overlay: HTMLElement;
  }> {
    await TestBed.configureTestingModule({
      imports: [DrawerRootWithOverlayComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(DrawerRootWithOverlayComponent);
    fx.detectChanges();
    fx.componentInstance.drawerOpen.set(true);
    fx.detectChanges();

    const panel = fx.nativeElement.querySelector('[data-testid="panel"]') as HTMLElement;
    const overlay = fx.nativeElement.querySelector('[data-testid="overlay"]') as HTMLElement;
    mockPanelSwipeRect(panel, 320, 200);
    return { fx, panel, overlay };
  }

  it('dims overlay opacity while dragging and disables its transition', async () => {
    const { fx, panel, overlay } = await openDrawerWithOverlay();

    touchDrag(panel, { startX: 160, startY: 100, endX: 160, endY: 200 });
    fx.detectChanges();

    expect(parseFloat(overlay.style.opacity)).toBeCloseTo(0.5, 1);
    expect(overlay.style.transition).toBe('none');
  });

  it('clears overlay opacity after a swipe that snaps back below the dismiss threshold', async () => {
    mockReducedMotion(true);
    const { fx, panel, overlay } = await openDrawerWithOverlay();

    touchSwipe(panel, { startX: 160, startY: 100, endX: 160, endY: 120 });
    fx.detectChanges();

    expect(fx.componentInstance.drawerOpen()).toBe(true);
    expect(overlay.style.opacity).toBe('');
    expect(panel.style.translate).toBe('');
  });

  it('dismisses the drawer when the pointer swipe passes the threshold', async () => {
    const { fx, panel } = await openDrawerWithOverlay();

    touchSwipe(panel, { startX: 160, startY: 100, endX: 160, endY: 250 });
    fx.detectChanges();

    expect(fx.componentInstance.drawerOpen()).toBe(false);
  });

  it('resets the panel on pointercancel without closing', async () => {
    const { fx, panel } = await openDrawerWithOverlay();
    const pid = 8;

    panel.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        clientX: 160,
        clientY: 100,
        pointerId: pid,
      }),
    );
    panel.dispatchEvent(
      new PointerEvent('pointermove', {
        bubbles: true,
        clientX: 160,
        clientY: 180,
        pointerId: pid,
      }),
    );
    panel.dispatchEvent(new PointerEvent('pointercancel', { bubbles: true, pointerId: pid }));
    fx.detectChanges();

    expect(fx.componentInstance.drawerOpen()).toBe(true);
    expect(panel.style.translate).toBe('');
  });

  it('resets the panel on touchcancel without closing', async () => {
    const { fx, panel } = await openDrawerWithOverlay();

    panel.dispatchEvent(touchEvent('touchstart', { identifier: 2, clientX: 160, clientY: 100 }));
    panel.dispatchEvent(touchEvent('touchmove', { identifier: 2, clientX: 160, clientY: 180 }));
    panel.dispatchEvent(touchEvent('touchcancel', { identifier: 2, clientX: 160, clientY: 180 }));
    fx.detectChanges();

    expect(fx.componentInstance.drawerOpen()).toBe(true);
    expect(panel.style.translate).toBe('');
  });

  it('snaps back immediately without a transition when prefers-reduced-motion is reduce', async () => {
    mockReducedMotion(true);
    const { fx, panel } = await openDrawerWithOverlay();

    pointerSwipe(panel, { startX: 160, startY: 100, endX: 160, endY: 130 });
    fx.detectChanges();

    expect(fx.componentInstance.drawerOpen()).toBe(true);
    expect(panel.style.transition).toBe('');
    expect(panel.style.translate).toBe('');
  });

  it('sets body cursor to grabbing while dragging and clears it afterward', async () => {
    const { fx, panel } = await openDrawerWithOverlay();
    const pid = 9;

    panel.dispatchEvent(
      new PointerEvent('pointerdown', {
        bubbles: true,
        clientX: 160,
        clientY: 100,
        pointerId: pid,
      }),
    );
    panel.dispatchEvent(
      new PointerEvent('pointermove', {
        bubbles: true,
        clientX: 160,
        clientY: 160,
        pointerId: pid,
      }),
    );
    fx.detectChanges();
    expect(document.body.style.cursor).toBe('grabbing');

    panel.dispatchEvent(new PointerEvent('pointerup', { bubbles: true, pointerId: pid }));
    fx.detectChanges();
    expect(document.body.style.cursor).toBe('');
  });

  it('swipe-dismisses a left drawer via touch events', async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerRootLeftHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const fx = TestBed.createComponent(DrawerRootLeftHostComponent);
    fx.detectChanges();
    fx.componentInstance.drawerOpen.set(true);
    fx.detectChanges();

    const panel = fx.nativeElement.querySelector('[data-testid="panel"]') as HTMLElement;
    mockPanelSwipeRect(panel, 320, 400);
    touchSwipe(panel, { startX: 300, startY: 200, endX: 20, endY: 200 });
    fx.detectChanges();

    expect(fx.componentInstance.drawerOpen()).toBe(false);
  });
});

describe('BetterDrawerCloseButton', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  it('closes the root open state when clicked inside bdDrawerRoot', async () => {
    const fx = TestBed.createComponent(CloseButtonInRootHostComponent);
    fx.detectChanges();
    fx.componentInstance.drawerOpen.set(true);
    fx.detectChanges();

    const closeBtn = fx.nativeElement.querySelector('[data-testid="close-btn"]') as HTMLElement;
    closeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fx.detectChanges();

    expect(fx.componentInstance.drawerOpen()).toBe(false);
  });

  it('closes standalone open when used outside bdDrawerRoot', async () => {
    const fx = TestBed.createComponent(CloseButtonStandaloneHostComponent);
    fx.detectChanges();
    expect(fx.componentInstance.drawerOpen()).toBe(true);

    const closeBtn = fx.nativeElement.querySelector('[data-testid="close-btn"]') as HTMLElement;
    closeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fx.detectChanges();

    expect(fx.componentInstance.drawerOpen()).toBe(false);
  });

  it('does not close when the root is not dismissible', async () => {
    const fx = TestBed.createComponent(CloseButtonNonDismissibleHostComponent);
    fx.detectChanges();

    const closeBtn = fx.nativeElement.querySelector('[data-testid="close-btn"]') as HTMLElement;
    closeBtn.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fx.detectChanges();

    expect(fx.componentInstance.drawerOpen()).toBe(true);
  });

  it('does not close the outer drawer while a nested drawer is open', async () => {
    const fx = TestBed.createComponent(CloseButtonNestedHostComponent);
    fx.detectChanges();

    const outerClose = fx.nativeElement.querySelector('[data-testid="outer-close"]') as HTMLElement;
    outerClose.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fx.detectChanges();

    expect(fx.componentInstance.outerOpen()).toBe(true);
    expect(fx.componentInstance.innerOpen()).toBe(true);
  });

  it('closes the outer drawer after the nested drawer is closed', async () => {
    const fx = TestBed.createComponent(CloseButtonNestedHostComponent);
    fx.detectChanges();
    fx.componentInstance.innerOpen.set(false);
    fx.detectChanges();

    const outerClose = fx.nativeElement.querySelector('[data-testid="outer-close"]') as HTMLElement;
    outerClose.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    fx.detectChanges();

    expect(fx.componentInstance.outerOpen()).toBe(false);
  });
});

describe('BetterDrawerPortal', () => {
  function portalHost(): HTMLElement | null {
    return document.body.querySelector('[better-drawer-portal]');
  }

  beforeEach(async () => {
    document.body.querySelectorAll('[better-drawer-portal]').forEach((el) => el.remove());
    await TestBed.configureTestingModule({
      imports: [PortalHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();
  });

  afterEach(() => {
    document.body.querySelectorAll('[better-drawer-portal]').forEach((el) => el.remove());
  });

  it('appends portal content to document.body on init', () => {
    const fx = TestBed.createComponent(PortalHostComponent);
    fx.detectChanges();

    const host = portalHost();
    expect(host).not.toBeNull();
    expect(host?.querySelector('[data-testid="portal-content"]')?.textContent?.trim()).toBe(
      'Portal content',
    );
  });

  it('removes the portal host from document.body on destroy', () => {
    const fx = TestBed.createComponent(PortalHostComponent);
    fx.detectChanges();
    expect(portalHost()).not.toBeNull();

    fx.destroy();
    expect(portalHost()).toBeNull();
  });
});
