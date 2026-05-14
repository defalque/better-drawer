import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { DocOther } from './doc-other';

describe('DocOther', () => {
  let component: DocOther;
  let fixture: ComponentFixture<DocOther>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocOther],
      providers: [provideZonelessChangeDetection(), provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(DocOther);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
