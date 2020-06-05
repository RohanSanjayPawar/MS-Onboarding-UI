import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationGraphComponent } from './location-graph.component';

describe('LocationGraphComponent', () => {
  let component: LocationGraphComponent;
  let fixture: ComponentFixture<LocationGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
});
