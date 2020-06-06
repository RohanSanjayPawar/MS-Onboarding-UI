import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddOnboardeeComponent } from './add-onboardee.component';

// Material
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

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

var onboardee = {
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
  joiningLocation: "",
  hiringManager: ""
}

describe('AddOnboardeeComponent', () => {
  let component: AddOnboardeeComponent;
  let fixture: ComponentFixture<AddOnboardeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddOnboardeeComponent],
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
        RouterTestingModule
      ],
      providers: [
        { provide: MatDialogRef, useValue: {} },
        { provide: SessionStorageService, useValue: {} },
        { provide: MAT_DIALOG_DATA, useValue: onboardee },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddOnboardeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    var store = {};

    spyOn(sessionStorage, 'getItem').and.callFake(function(key) {
      return store[key];
    });
    spyOn(sessionStorage, 'setItem').and.callFake(function (key, value) {
      return store[key] = value + '';
    });
    spyOn(sessionStorage, 'clear').and.callFake(function () {
        store = {};
    });
    sessionStorage.setItem("loggedIn", "false");
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('all skills should be false', () => {
    expect(component.angular).toEqual(false);
    expect(component.spring).toEqual(false);
    expect(component.java).toEqual(false);
    expect(component.projectManager).toEqual(false);
  });

  it('skillSet must be empty', () => {
    expect(component.skillSet.length).toEqual(0);
  });

  it('should not be loggedIn', () => {
    expect(sessionStorage.getItem("loggedIn")).toEqual("false");
  });

  it('edit must be false', () => {
    expect(component.edit).toEqual(false);
  });

  it('demands must be empty', () => {
    expect(component.demands.length).toEqual(0);
  });
});
