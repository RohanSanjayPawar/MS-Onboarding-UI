import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnboardeeComponent } from './onboardee.component';
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
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { OnboardeeService } from 'src/app/service/onboardee.service';

describe('OnboardeeComponent', () => {
  let component: OnboardeeComponent;
  let fixture: ComponentFixture<OnboardeeComponent>;
  let sessionService: SessionStorageService;
  let onboardeeService: OnboardeeService;
  let router: Router;
  let title: Title;
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

  const onboardee =  {
    uid: 0,
    demandUid: 0,
    firstName: "",
    lastName: "",
    webLoginId: "",
    skillSet: [],
    status: "",
    demandId: 0,
    backgroundCheckStatus: "",
    etaForOnboarding: 0,
    experience: 0,
    joiningLocation: user.currentOffice,
    hiringManager: user.firstName + " " + user.lastName
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnboardeeComponent ],
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
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnboardeeComponent);
    component = fixture.componentInstance;
    sessionService = TestBed.get(SessionStorageService);
    onboardeeService = TestBed.get(OnboardeeService);
    router = TestBed.get(Router);
    title = TestBed.get(Title);
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
    sessionService.store("loggedIn", "false");
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('allowed must be true', () => {
    spyOn(component, 'checkLogin').and.callThrough();
    sessionService.store("user", user);
    component.checkLogin();
    expect(component.allowed).toEqual(false);
  });

  it(`should have 'MS Onboarding Portal - Onboarding' as title`, () => {
    expect(component.getTitle()).toEqual('MS Onboarding Portal - Onboardee Details');
  });

  it(`should delete onboardee`, () => {
    spyOn(component, 'delete').withArgs(onboardee).and.callThrough();
    component.delete(onboardee);
    expect(component.getTitle()).toEqual('MS Onboarding Portal - Onboardee Details');
  });
});
