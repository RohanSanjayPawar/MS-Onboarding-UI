import { Component, OnInit } from '@angular/core';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private isLoggedIn = false;

  constructor(
    private authService: AuthService, 
    private router: Router,
    private sessionStorage: SessionStorageService) { }

  ngOnInit() {
    this.isLoggedIn = this.sessionStorage.retrieve("loggedIn");
    this.sessionStorage.observe("loggedIn").subscribe((data) => {
      this.isLoggedIn = data;
    });
  }

  signOut() {
    this.authService.signOut();
    this.sessionStorage.store("loggedIn", false);
    this.sessionStorage.store("user", null);
    this.router.navigate(['/']);
    console.log('User signed out.');
  }

}
