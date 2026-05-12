import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeTabs } from './code-tabs';

describe('CodeTabs', () => {
  let component: CodeTabs;
  let fixture: ComponentFixture<CodeTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodeTabs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeTabs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
