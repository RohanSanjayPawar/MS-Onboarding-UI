import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserlogsService {

  constructor(private http: HttpClient) { }

  addLoginLog(userLog: any, uid: number) {
    return this.http.put("http://localhost:4200/api/user-logs/add/"+uid, userLog);
  }

  getAllLogs(uid: number) {
    return this.http.get("http://localhost:4200/api/user-logs/"+uid);
  }
}
