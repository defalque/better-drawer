import { Component, model, provideZonelessChangeDetection, signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetterDrawer, BetterDrawerOverlay } from './better-drawer';
import { BetterDrawerPosition } from './better-drawer.types';

@Component({
  standalone: true,
  imports: [BetterDrawerOverlay],
  template: `<div bdOverlay [(open)]="open"></div>`,
})
class OverlayHostComponent {
  readonly open = model(false);
}

@Component({
  standalone: true,
  imports: [BetterDrawer],
  template: `
    <aside bdDrawer [(open)]="drawerOpen" [position]="position()">
      <span data-testid="projected">drawer body</span>
    </aside>
  `,
})
class DrawerHostComponent {
  readonly drawerOpen = model(false);
  readonly position = signal<BetterDrawerPosition>('left');
}

describe('BetterDrawerOverlay', () => {
  let fixture: ComponentFixture<OverlayHostComponent>;

  function overlayHost(): HTMLElement {
    const el = fixture.nativeElement as HTMLElement;
    return el.querySelector('[bdOverlay]') as HTMLElement;
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
});

describe('BetterDrawer', () => {
  let fixture: ComponentFixture<DrawerHostComponent>;

  function drawerEl(): HTMLElement {
    const el = fixture.nativeElement as HTMLElement;
    return el.querySelector('[bdDrawer]') as HTMLElement;
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

  it('defaults position to left on data-position', () => {
    expect(drawerEl().getAttribute('data-position')).toBe('left');
  });

  it('reflects position input on data-position', () => {
    const positions: BetterDrawerPosition[] = ['left', 'right', 'top', 'bottom'];

    for (const position of positions) {
      fixture.componentInstance.position.set(position);
      fixture.detectChanges();

      expect(drawerEl().getAttribute('data-position')).toBe(position);
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
});
