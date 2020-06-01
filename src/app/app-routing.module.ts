import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { OnboardeeComponent } from './components/onboardee/onboardee.component';
import { UserLogsComponent } from './components/user-logs/user-logs.component';
import { TrendsComponent } from './components/trends/trends.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent, data : {login : false} },
  { path: 'login', component: LoginComponent },
  { path: 'onboardee', component: OnboardeeComponent },
  { path: 'user-logs', component: UserLogsComponent },
  { path: 'trends', component: TrendsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
