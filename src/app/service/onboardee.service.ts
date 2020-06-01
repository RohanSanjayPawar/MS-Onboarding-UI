import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OnboardeeService {

  constructor(private http: HttpClient) { }

  getAllOnboardee() {
    return this.http.get<any[]>("http://localhost:4200/api/onboardee/");
  }

  deleteOnboardee(uid: number) {
    return this.http.put("http://localhost:4200/api/onboardee/delete/"+uid, {});
  }

  updateOnboardee(uid, onboardee) {
    return this.http.put("http://localhost:4200/api/onboardee/update/"+uid, onboardee);
  }

  addOnboardee(onboardee) {
    return this.http.put("http://localhost:4200/api/onboardee/add", onboardee);
  }
}
