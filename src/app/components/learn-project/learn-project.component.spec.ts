import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LearnProjectComponent } from './learn-project.component';

describe('LearnProjectComponent', () => {
  let component: LearnProjectComponent;
  let fixture: ComponentFixture<LearnProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LearnProjectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LearnProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
