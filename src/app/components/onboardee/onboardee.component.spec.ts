import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardeeComponent } from './onboardee.component';

describe('OnboardeeComponent', () => {
  let component: OnboardeeComponent;
  let fixture: ComponentFixture<OnboardeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
