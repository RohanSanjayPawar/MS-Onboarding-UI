import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DemandService {

  constructor(private http: HttpClient) { }

  getDemands() {
    return this.http.get<any[]>("http://localhost:4200/api/demand/");
  }

  getAllDemands(uid) {
    return this.http.get<any[]>("http://localhost:4200/api/demand/"+uid);
  }

  filterDemands(uid, onboardee) {
    return this.http.put<any[]>("http://localhost:4200/api/demand/"+uid, onboardee);
  }

  updateDemands(uid) {
    return this.http.put("http://localhost:4200/api/demand/update/"+uid, "");
  }

  deleteOnboardee(uid) {
    return this.http.put("http://localhost:4200/api/demand/delete-onboardee/"+uid, "");
  }

  fetchDemandForUID(uid) {
    return this.http.get<any[]>("http://localhost:4200/api/demand/get/"+uid);
  }
}
