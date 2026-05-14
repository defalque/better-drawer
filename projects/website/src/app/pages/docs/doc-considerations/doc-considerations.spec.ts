import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { DocConsiderations } from './doc-considerations';

describe('DocConsiderations', () => {
  let component: DocConsiderations;
  let fixture: ComponentFixture<DocConsiderations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocConsiderations],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DocConsiderations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
