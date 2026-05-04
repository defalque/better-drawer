import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetterDrawer } from './better-drawer';
import { BetterDrawerPosition } from './better-drawer.types';

describe('BetterDrawer', () => {
  let component: BetterDrawer;
  let fixture: ComponentFixture<BetterDrawer>;

  function nativeEl(): HTMLElement {
    return fixture.nativeElement as HTMLElement;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BetterDrawer],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(BetterDrawer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders nothing when closed', () => {
    expect(nativeEl().querySelector('.overlay')).toBeNull();
    expect(nativeEl().querySelector('[role="dialog"]')).toBeNull();
  });

  it('renders overlay and dialog when open', () => {
    component.open.set(true);
    fixture.detectChanges();

    expect(nativeEl().querySelector('.overlay')).not.toBeNull();
    expect(nativeEl().querySelector('.drawer[role="dialog"]')).not.toBeNull();
  });

  it('closes when overlay is clicked', () => {
    component.open.set(true);
    fixture.detectChanges();

    nativeEl().querySelector('.overlay')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    fixture.detectChanges();

    expect(component.open()).toBe(false);
    expect(nativeEl().querySelector('.overlay')).toBeNull();
    expect(nativeEl().querySelector('[role="dialog"]')).toBeNull();
  });

  it('does not close when drawer is clicked', () => {
    component.open.set(true);
    fixture.detectChanges();

    nativeEl().querySelector('.drawer')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    fixture.detectChanges();

    expect(component.open()).toBe(true);
    expect(nativeEl().querySelector('.overlay')).not.toBeNull();
  });

  it('reflects position input on data-position', () => {
    const positions: BetterDrawerPosition[] = ['left', 'right', 'top', 'bottom'];

    for (const position of positions) {
      fixture.componentRef.setInput('position', position);
      component.open.set(true);
      fixture.detectChanges();

      expect(nativeEl().querySelector('.drawer')?.getAttribute('data-position')).toBe(position);
    }
  });
});
