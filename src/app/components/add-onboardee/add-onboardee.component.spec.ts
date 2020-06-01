import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOnboardeeComponent } from './add-onboardee.component';

describe('AddOnboardeeComponent', () => {
  let component: AddOnboardeeComponent;
  let fixture: ComponentFixture<AddOnboardeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOnboardeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOnboardeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
