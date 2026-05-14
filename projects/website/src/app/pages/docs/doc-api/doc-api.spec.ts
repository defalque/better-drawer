import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { DocApi } from './doc-api';

describe('DocApi', () => {
  let component: DocApi;
  let fixture: ComponentFixture<DocApi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocApi],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DocApi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
