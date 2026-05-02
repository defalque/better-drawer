import { provideZonelessChangeDetection } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BetterDrawer } from './better-drawer';

describe('BetterDrawer', () => {
  let component: BetterDrawer;
  let fixture: ComponentFixture<BetterDrawer>;

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
});
