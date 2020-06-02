import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
  MatListModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider } from 'angularx-social-login';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { OnboardeeComponent } from './components/onboardee/onboardee.component';
import { UserLogsComponent } from './components/user-logs/user-logs.component';
import { AddOnboardeeComponent } from './components/add-onboardee/add-onboardee.component';
import { TrendsComponent } from './components/trends/trends.component';
import { BarChartComponent } from './components/trends/bar-chart/bar-chart.component';
import { ProfileChartComponent } from './components/trends/profile-chart/profile-chart.component';
import { LocationGraphComponent } from './components/trends/location-graph/location-graph.component';
import { ManagerChartComponent } from './components/trends/manager-chart/manager-chart.component';
import { ExperienceChartComponent } from './components/trends/experience-chart/experience-chart.component';

const google_oauth_client_id:string = '833115512170-mh1qim32kmkcqv8c2gqtqvgu7no1q7qj.apps.googleusercontent.com';
let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(google_oauth_client_id)
  }
]);

export function provideConfig() {
  return config;
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    OnboardeeComponent,
    UserLogsComponent,
    AddOnboardeeComponent,
    TrendsComponent,
    BarChartComponent,
    ProfileChartComponent,
    LocationGraphComponent,
    ManagerChartComponent,
    ExperienceChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatIconModule,
    MatTabsModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule, 
    MatTableModule,
    MatListModule,
    MatMenuModule,
    MatGridListModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSelectModule,
    MatFormFieldModule,
    MatOptionModule,
    FormsModule,
    HttpClientModule,
    SocialLoginModule,
    NgxWebstorageModule.forRoot()
  ],
  providers: [
    Title,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AddOnboardeeComponent
  ]
})
export class AppModule { }
