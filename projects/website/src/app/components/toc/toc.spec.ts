import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Toc } from './toc';

describe('Toc', () => {
  let component: Toc;
  let fixture: ComponentFixture<Toc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Toc]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Toc);
    fixture.componentRef.setInput('route', '/docs');
    fixture.componentRef.setInput('sections', ['intro']);
    fixture.componentRef.setInput('labels', ['Intro']);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
