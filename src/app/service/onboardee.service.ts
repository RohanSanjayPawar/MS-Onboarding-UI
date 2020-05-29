import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OnboardeeService {

  constructor(private http: HttpClient) { }

  getAllOnboardee() {
    return this.http.get("http://localhost:4200/api/onboardee/");
  }
}
