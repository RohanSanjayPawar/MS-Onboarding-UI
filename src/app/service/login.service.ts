import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  googleLogin() {
    return this.http.get("http://localhost:4200/api/restricted");
  }

  searchEmail(email: String) {
    return this.http.get("http://localhost:4200/api/user/"+email);
  }

  addUser(user: any)  {
    return this.http.put("http://localhost:4200/api/user/add", user);
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
