import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { OnboardeeService } from 'src/app/service/onboardee.service';
import { UserlogsService } from 'src/app/service/userlogs.service';

@Component({
  selector: 'app-user-logs',
  templateUrl: './user-logs.component.html',
  styleUrls: ['./user-logs.component.scss']
})
export class UserLogsComponent implements OnInit {

  private title = 'MS Onboarding Portal - User Logs';

  displayedColumns: string[];
  dataSource: any;

  constructor(
    private router: Router, 
    private sessionStorage: SessionStorageService,
    private userlogsService: UserlogsService,
    private titleService: Title,
  ) { }

  public setTitle() {
    this.titleService.setTitle(this.title);
  }

  ngOnInit() {
    if(!this.sessionStorage.retrieve("loggedIn")) {
      this.router.navigate(['/home']);
    } else {
      var user = this.sessionStorage.retrieve("user");
      this.userlogsService.getAllLogs(user.uid).subscribe((data) => {
        this.displayedColumns = ['uid', 'userName', 'description', 'createdAt'];
        console.log(data);
        this.dataSource = data;
      });
    }
    this.setTitle();
  }

}
