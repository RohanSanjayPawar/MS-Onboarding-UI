import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrendsComponent } from './trends.component';
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

describe('TrendsComponent', () => {
  let component: TrendsComponent;
  let fixture: ComponentFixture<TrendsComponent>;
  let sessionService: SessionStorageService;
  let router: Router;
  let title: Title;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrendsComponent ],
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
    fixture = TestBed.createComponent(TrendsComponent);
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
});
