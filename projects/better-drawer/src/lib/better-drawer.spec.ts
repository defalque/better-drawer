import { Component, model, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import {
  BetterDrawerContent,
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
    <button bdDrawerTrigger type="button" [(open)]="drawerOpen" [disabled]="true" data-testid="trigger"></button>
  `,
})
class TriggerDisabledHostComponent {
  readonly drawerOpen = model(false);
}

@Component({
  imports: [BetterDrawerTrigger],
  template: `<button bdDrawerTrigger type="button" [(open)]="drawerOpen" data-testid="trigger"></button>`,
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
    <div bdDrawerRoot [(open)]="drawerOpen" [dismissible]="false">
      <div bdDrawerOverlay data-testid="overlay"></div>
      <aside bdDrawerContent data-testid="panel">
        <h2 bdDrawerTitle>Title</h2>
        <button type="button" data-testid="close-inside" (click)="drawerOpen.set(false)">Close</button>
      </aside>
    </div>
  `,
})
class DrawerRootNonDismissibleComponent {
  readonly drawerOpen = model(false);
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
});

describe('BetterDrawerTrigger', () => {
  it('reflects accessibility state from open and controlsId', async () => {
    await TestBed.configureTestingModule({
      imports: [TriggerOnlyHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const trigFixture = TestBed.createComponent(TriggerOnlyHostComponent);
    trigFixture.detectChanges();

    const button = trigFixture.nativeElement.querySelector('[data-testid="trigger"]') as HTMLElement;
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

    const button = trigFixture.nativeElement.querySelector('[data-testid="trigger"]') as HTMLElement;
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

    const button = trigFixture.nativeElement.querySelector('[data-testid="trigger"]') as HTMLElement;
    expect(button.hasAttribute('aria-controls')).toBe(false);
  });

  it('does not toggle open when disabled', async () => {
    await TestBed.configureTestingModule({
      imports: [TriggerDisabledHostComponent],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    const trigFixture = TestBed.createComponent(TriggerDisabledHostComponent);
    trigFixture.detectChanges();

    const button = trigFixture.nativeElement.querySelector('[data-testid="trigger"]') as HTMLElement;
    button.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    trigFixture.detectChanges();
    expect(trigFixture.componentInstance.drawerOpen()).toBe(false);
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
});
