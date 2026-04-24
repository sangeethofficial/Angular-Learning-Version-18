import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicComponent1Component } from './basic-component1.component';

describe('BasicComponent1Component', () => {
  let component: BasicComponent1Component;
  let fixture: ComponentFixture<BasicComponent1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BasicComponent1Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicComponent1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
