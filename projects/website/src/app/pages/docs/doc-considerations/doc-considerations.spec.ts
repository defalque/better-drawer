import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocConsiderations } from './doc-considerations';

describe('DocConsiderations', () => {
  let component: DocConsiderations;
  let fixture: ComponentFixture<DocConsiderations>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DocConsiderations],
    }).compileComponents();

    fixture = TestBed.createComponent(DocConsiderations);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
