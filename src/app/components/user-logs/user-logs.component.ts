import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
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

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    if(!this.sessionStorage.retrieve("loggedIn")) {
      this.router.navigate(['/home']);
    } else {
      var user = this.sessionStorage.retrieve("user");
      this.userlogsService.getAllLogs(user.uid).subscribe((data) => {
        this.displayedColumns = ['uid', 'userName', 'description', 'createdAt'];
        console.log(data);
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
      });
    }
    this.setTitle();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
