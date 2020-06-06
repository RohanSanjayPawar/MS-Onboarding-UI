import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocationGraphComponent } from './location-graph.component';
import {
  MatInputModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatIconModule,
  MatButtonModule,
  MatToolbarModule,
  MatCardModule,
  MatGridListModule,
  MatDialogModule,
  MatTableModule,
  MatMenuModule,
  MatFormFieldModule,
  MatOptionModule,
  MatSelectModule,
  MatCheckboxModule,
  MatTabsModule,
  MatListModule
} from '@angular/material';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SessionStorageService } from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { OnboardeeService } from 'src/app/service/onboardee.service';

describe('LocationGraphComponent', () => {
  let component: LocationGraphComponent;
  let fixture: ComponentFixture<LocationGraphComponent>;
  let sessionService: SessionStorageService;
  let onboardeeService: OnboardeeService;
  let router: Router;
  const user = {
    "uid": 1,
    "firstName": "",
    "lastName": "",
    "webLoginId": "",
    "password": "",
    "failedLoginAttempt": 0,
    "lastLoginAt": null,
    "createdAt": null,
    "updateAt": null,
    "currentOffice": "Mumbai",
    "role": "MANAGER"
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocationGraphComponent ],
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule,

        // Material Imports
        MatMenuModule,
        MatInputModule,
        MatFormFieldModule,
        MatOptionModule,
        MatCardModule,
        MatCheckboxModule,
        MatListModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatTabsModule,
        MatSelectModule,
        MatGridListModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        HttpClientTestingModule,
        RouterTestingModule,
        NgxWebstorageModule.forRoot()
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationGraphComponent);
    component = fixture.componentInstance;
    sessionService = TestBed.get(SessionStorageService);
    onboardeeService = TestBed.get(OnboardeeService);
    router = TestBed.get(Router);
    fixture.detectChanges();

    var store = {};

    spyOn(sessionService, 'retrieve').and.callFake(function(key) {
      return store[key];
    });
    spyOn(sessionService, 'store').and.callFake(function (key, value) {
      return store[key] = value + '';
    });
    spyOn(sessionService, 'clear').and.callFake(function () {
        store = {};
    });
    sessionService.store("loggedIn", "true");
    sessionService.store("user", user);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should check list`, () => {
    expect(component.barChart.length >= 0).toEqual(true);
    expect(component.role.length >= 0).toEqual(true);
    expect(component.demand.length >= 0).toEqual(true);
    expect(component.demand.length >= 0).toEqual(true);
  });

  it(`should check color`, () => {
    spyOn(component, 'dynamicColors').and.callThrough();
    component.dynamicColors();
    expect(component.red >= 103).toEqual(true);
    expect(component.blue >= 193).toEqual(true);
    expect(component.green >= 99).toEqual(true);
  });

  it(`should make chart`, () => {
    spyOn(component, 'makeChart').and.callThrough();
    component.makeChart();
    expect(component.role.length >= 0).toEqual(true);
  });
});
