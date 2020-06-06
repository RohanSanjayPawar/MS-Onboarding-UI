import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLogsComponent } from './user-logs.component';
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

describe('UserLogsComponent', () => {
  let component: UserLogsComponent;
  let fixture: ComponentFixture<UserLogsComponent>;
  let sessionService: SessionStorageService;
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLogsComponent ],
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
    fixture = TestBed.createComponent(UserLogsComponent);
    component = fixture.componentInstance;
    sessionService = TestBed.get(SessionStorageService);
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

  it('Displayed Columns must be undefined', () => {
    spyOn(component, 'checkLogin').and.callThrough();
    sessionService.store("user", user);
    sessionService.store("loggedIn", true);
    component.checkLogin();
    expect(component.displayedColumns).toEqual(undefined);
  });

  it(`should have 'MS Onboarding Portal - Logs' as title`, () => {
    expect(component.getTitle()).toEqual('MS Onboarding Portal - User Logs');
  });
});
