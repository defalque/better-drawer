import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { DocDefault } from './doc-default';

describe('DocDefault', () => {
  let component: DocDefault;
  let fixture: ComponentFixture<DocDefault>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocDefault],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DocDefault);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
