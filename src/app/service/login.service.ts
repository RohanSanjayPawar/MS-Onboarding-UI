import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  googleLogin() {
    return this.http.get("http://localhost:4200/api/restricted");
  }

  basicAuth(username, password) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': 'Basic ' + btoa(username+":"+password)
      })
    };
    return this.http.get("http://localhost:4200/api/user/login", httpOptions);
  }
}
