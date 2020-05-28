import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  private isLoggedIn = false;

  constructor() { }

  getLoginStatus() {
    return this.isLoggedIn;
  }

  setLoginStatus(loginStatus) {
    this.isLoggedIn = loginStatus;
  }
}
