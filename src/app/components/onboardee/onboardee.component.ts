import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OnboardeeService } from 'src/app/service/onboardee.service';
import { MatDialog } from '@angular/material';
import { AddOnboardeeComponent } from '../add-onboardee/add-onboardee.component';
import { UserlogsService } from 'src/app/service/userlogs.service';

@Component({
  selector: 'app-onboardee',
  templateUrl: './onboardee.component.html',
  styleUrls: ['./onboardee.component.scss']
})

export class OnboardeeComponent implements OnInit {

  private title = 'MS Onboarding Portal - Onboardee Details';

  displayedColumns: string[];
  dataSource: any;

  constructor(
    private router: Router, 
    private sessionStorage: SessionStorageService,
    private onboardeeService: OnboardeeService,
    private titleService: Title,
    private userLogService: UserlogsService,
    public dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  public setTitle() {
    this.titleService.setTitle(this.title);
  }

  ngOnInit() {
    if(!this.sessionStorage.retrieve("loggedIn")) {
      this.router.navigate(['/home']);
    } else {
      this.onboardeeService.getAllOnboardee().subscribe((data) => {
        this.displayedColumns = ['uid', 'firstName', 'lastName',  'webLoginId', 'hiringManager', 'joiningLocation', 'skillSet', 'experience', 'status', 'backgroundCheckStatus', 'etaForOnboarding', 'edit', 'delete'];
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

  addOnboardee() {
    var user = this.sessionStorage.retrieve("user");

    const dialogRef = this.dialog.open(AddOnboardeeComponent, {
      width: '80%',
      height: '80%', data: {
        uid: 0,
        firstName: "",
        lastName: "",
        webLoginId: "",
        skillSet: [],
        status: "",
        demandId: 0,
        backgroundCheckStatus: "",
        etaForOnboarding: 0,
        experience: 0,
        joiningLocation: user.currentOffice,
        hiringManager: user.firstName + " " + user.lastName
      }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.onboardeeService.getAllOnboardee().subscribe((data) => {
        this.dataSource = new MatTableDataSource<any>(data);

        var user1 = this.sessionStorage.retrieve("user");
        var userLog = {
          "uid": 1,
          "userName": user1.firstName + " " + user1.lastName,
          "description": "Added Onboardee!",
          "createdAt": new Date().toISOString().substring(0, 19)
        };
        console.log(userLog.createdAt);
        this.dataSource.paginator = this.paginator;
        this.userLogService.addLoginLog(userLog, user1.uid).subscribe(() => {
        });
      });
    });
  }

  delete(uid: number) {
    console.log(uid);
    this.onboardeeService.deleteOnboardee(uid).subscribe(() => {
      this.onboardeeService.getAllOnboardee().subscribe((data) => {
        this.dataSource = new MatTableDataSource<any>(data);

        var user = this.sessionStorage.retrieve("user");
        var userLog = {
          "uid": 1,
          "userName": user.firstName + " " + user.lastName,
          "description": "Deleted Onboardee "+uid,
          "createdAt": new Date().toISOString().substring(0, 19)
        };
        console.log(userLog.createdAt);
        this.dataSource.paginator = this.paginator;
        this.userLogService.addLoginLog(userLog, user.uid).subscribe(() => {
        });
      });
    });
  }

  edit(user) {
    const dialogRef = this.dialog.open(AddOnboardeeComponent, {
      width: '80%',
      height: '80%', data: user
    });

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.onboardeeService.getAllOnboardee().subscribe((data) => {
        this.dataSource = new MatTableDataSource<any>(data);

        var user1 = this.sessionStorage.retrieve("user");
        var userLog = {
          "uid": 1,
          "userName": user1.firstName + " " + user1.lastName,
          "description": "Updated Onboardee "+user.uid +"!",
          "createdAt": new Date().toISOString().substring(0, 19)
        };
        console.log(userLog.createdAt);
        this.dataSource.paginator = this.paginator;
        this.userLogService.addLoginLog(userLog, user1.uid).subscribe(() => {
        });
      });
    });

  }

}
