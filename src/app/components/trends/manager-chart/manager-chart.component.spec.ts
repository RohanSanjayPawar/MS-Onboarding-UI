import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerChartComponent } from './manager-chart.component';

describe('ManagerChartComponent', () => {
  let component: ManagerChartComponent;
  let fixture: ComponentFixture<ManagerChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
