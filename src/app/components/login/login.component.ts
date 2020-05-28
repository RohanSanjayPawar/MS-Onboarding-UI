import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { SessionStorageService } from 'ngx-webstorage';
import { LoginService } from 'src/app/service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private user: any;
  private title = 'MS Onboarding Portal - Login';

  constructor(
    private router: Router, 
    private authService: AuthService,
    private sessionStorage: SessionStorageService,
    private loginService: LoginService,
    private titleService: Title,
  ) { }

  public setTitle() {
    this.titleService.setTitle(this.title);
  }

  username: string;
  password: string;

  ngOnInit() {
    this.user = this.sessionStorage.retrieve("user");
    this.setTitle();
  }

  login() {
    this.loginService.basicAuth(this.username, this.password).subscribe((data) => {
      console.log(data);
      if(data !== []) {
        this.sessionStorage.store("loggedIn", true);
        this.sessionStorage.store("user", data);
        this.router.navigate(['/home']);
      } else {
        this.sessionStorage.store("loggedIn", false);
        this.router.navigate(['/']);
      }
    });
  }

  // Method to sign in with google.
  singIn(platform : string) {
    if(this.sessionStorage.retrieve("loggedIn")) {
      this.user = this.sessionStorage.retrieve("user");
      this.router.navigate(['/home']);
    } else {
      platform = GoogleLoginProvider.PROVIDER_ID;
      this.authService.signIn(platform).then(
        (response) => {
          console.log(platform + " logged in user data is= " , response);
          this.user = response;
          this.sessionStorage.store("loggedIn", true);
          this.sessionStorage.store("user", this.user);
          this.router.navigate(['/home']);
        }
      );
    }
  }
 
  // Method to log out.
  signOut() {
    this.authService.signOut();
    this.user = null;
    console.log('User signed out.');
  }

}
