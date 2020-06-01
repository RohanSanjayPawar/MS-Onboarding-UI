import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Router } from '@angular/router';
import { AuthService, GoogleLoginProvider } from 'angularx-social-login';
import { SessionStorageService } from 'ngx-webstorage';
import { LoginService } from 'src/app/service/login.service';
import { UserlogsService } from 'src/app/service/userlogs.service';
import { FormControl, Validators, FormGroup } from '@angular/forms';

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
    private userLogService: UserlogsService,
    private titleService: Title,
  ) { }

  public setTitle() {
    this.titleService.setTitle(this.title);
  }

  username: any;
  password: any;

  user_data: any;

  ngOnInit() {
    this.user = this.sessionStorage.retrieve("user");
    
    this.username = new FormControl('', Validators.compose([Validators.email, Validators.required, Validators.minLength(5)]));
    this.password = new FormControl('', Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(20)]))
    
    this.setTitle();
  }

  login() {
    this.loginService.basicAuth(this.username.value, this.password.value).subscribe((data) => {
      console.log(data);
      if(data !== []) {
        this.user = data[0];
        var userLog = {
          "uid": 1,
          "userName": this.user.firstName + " " + this.user.lastName,
          "description": "Login to Portal!",
          "createdAt": new Date().toISOString().substring(0, 19)
        };
        console.log(userLog.createdAt);

        this.userLogService.addLoginLog(userLog, this.user.uid).subscribe(() => {
          this.sessionStorage.store("loggedIn", true);
          this.sessionStorage.store("user", this.user);
          this.router.navigate(['/onboardee']);
        });
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
      this.router.navigate(['/onboardee']);
    } else {
      platform = GoogleLoginProvider.PROVIDER_ID;
      this.authService.signIn(platform).then(
        (response) => {
          console.log(platform + " logged in user data is= ", response);
          this.loginService.searchEmail(response.email).subscribe((data) => {
            if(data !== []) {
              this.user = data[0];
              var userLog = {
                "uid": 1,
                "userName": this.user.firstName + " " + this.user.lastName,
                "description": "Login to Portal!",
                "createdAt": new Date().toISOString().substring(0, 19)
              };
              console.log(userLog.createdAt);
      
              this.userLogService.addLoginLog(userLog, this.user.uid).subscribe(() => {
                this.sessionStorage.store("loggedIn", true);
                this.sessionStorage.store("user", this.user);
                this.router.navigate(['/onboardee']);
              });
            } else {

              this.user = {
                "uid": 1,
                "firstName": response.firstName,
                "lastName": response.lastName,
                "webLoginId": response.email,
                "password": response.authToken,
                "failedLoginAttempt": 0,
                "lastLoginAt": null,
                "createdAt": null,
                "updateAt": null,
                "currentOffice": "Mumbai",
                "role": "MANAGER"
              }

              this.loginService.addUser(this.user).subscribe((newUser) => {
                this.user = newUser;
                var userLog = {
                  "uid": 1,
                  "userName": this.user.firstName + " " + this.user.lastName,
                  "description": "Login to Portal!",
                  "createdAt": new Date().toISOString().substring(0, 19)
                };
                console.log(userLog.createdAt);

                this.userLogService.addLoginLog(userLog, this.user.uid).subscribe(() => {
                  this.sessionStorage.store("loggedIn", true);
                  this.sessionStorage.store("user", this.user);
                  this.router.navigate(['/home']);
                });
              });
            }
            
          });
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
