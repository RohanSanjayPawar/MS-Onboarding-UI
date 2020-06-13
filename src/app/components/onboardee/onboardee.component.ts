import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OnboardeeService } from 'src/app/service/onboardee.service';
import { MatDialog } from '@angular/material';
import { AddOnboardeeComponent, Onboardee } from '../add-onboardee/add-onboardee.component';
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
  user: any;
  allowed: boolean = true;

  constructor(
    private router: Router,
    private sessionStorage: SessionStorageService,
    private onboardeeService: OnboardeeService,
    private titleService: Title,
    private userLogService: UserlogsService,
    public dialog: MatDialog
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  public setTitle() {
    this.titleService.setTitle(this.title);
  }

  ngOnInit() {
    this.checkLogin();
  }

  getTitle() {
    return this.title;
  }

  checkLogin() {
    if (!this.sessionStorage.retrieve("loggedIn")) {
      this.router.navigate(['/home']);
    } else {
      this.user = this.sessionStorage.retrieve("user");
      if (this.user.role !== "ADMIN") {
        this.allowed = false;
      }
      this.onboardeeService.getAllOnboardee().subscribe((data) => {
        if (this.user.role !== "ADMIN") {
          this.displayedColumns = ['uid', 'firstName', 'lastName', 'webLoginId', 'hiringManager', 'joiningLocation', 'skillSet', 'experience', 'status', 'backgroundCheckStatus', 'etaForOnboarding', 'edit'];
        } else {
          this.displayedColumns = ['uid', 'firstName', 'lastName', 'webLoginId', 'hiringManager', 'joiningLocation', 'skillSet', 'experience', 'status', 'backgroundCheckStatus', 'etaForOnboarding', 'edit', 'delete'];
        }
        console.log(data);
        data = data.sort((a, b) => b.uid - a.uid);
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

    var onboardee = {
      uid: 0,
      demandUid: 0,
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
    this.sessionStorage.store("changed", false);

    const dialogRef = this.dialog.open(AddOnboardeeComponent, {
      width: '80%',
      height: '80%', data: onboardee
    });

    dialogRef.afterClosed().subscribe(() => {
      this.onboardeeService.getAllOnboardee().subscribe((data) => {
        data = data.sort((a, b) => b.uid - a.uid);
        this.dataSource = new MatTableDataSource<any>(data);
        if(this.sessionStorage.retrieve("changed")) {
          var user1 = this.sessionStorage.retrieve("user");
          var userLog = {
            "uid": 1,
            "userName": user1.firstName + " " + user1.lastName,
            "description": "Added Onboardee " + onboardee.firstName + " " + onboardee.lastName + "!",
            "createdAt": new Date().toISOString().substring(0, 19)
          };
          console.log(userLog.createdAt);
          this.userLogService.addLoginLog(userLog, user1.uid).subscribe(() => {
          });
        }
        this.dataSource.paginator = this.paginator;
      });
    });
  }

  delete(onboardee: any) {
    console.log(onboardee.uid);
    this.onboardeeService.deleteOnboardee(onboardee.uid).subscribe(() => {
      this.onboardeeService.getAllOnboardee().subscribe((data) => {
        data = data.sort((a, b) => b.uid - a.uid);
        this.dataSource = new MatTableDataSource<any>(data);

        var user = this.sessionStorage.retrieve("user");
        var userLog = {
          "uid": 1,
          "userName": user.firstName + " " + user.lastName,
          "description": onboardee.firstName + " " + onboardee.lastName + " has left the MS Team!",
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
    var copy = { ...user }
    this.sessionStorage.store("changed", false);
    const dialogRef = this.dialog.open(AddOnboardeeComponent, {
      width: '80%',
      height: '80%', data: user
    });
    

    dialogRef.afterClosed().subscribe(() => {
      console.log('The dialog was closed');
      this.onboardeeService.getAllOnboardee().subscribe((data) => {
        data = data.sort((a, b) => b.uid - a.uid);
        this.dataSource = new MatTableDataSource<any>(data);
        var user1 = this.sessionStorage.retrieve("user");
        if(this.sessionStorage.retrieve("changed")) {
          var userLog = {
            "uid": 1,
            "userName": user1.firstName + " " + user1.lastName,
            "description": "Onboardee " + user.firstName + " " + user.lastName + " was updated!",
            "createdAt": new Date().toISOString().substring(0, 19)
          };
          console.log(userLog.createdAt);
          this.dataSource.paginator = this.paginator;
          this.userLogService.addLoginLog(userLog, user1.uid).subscribe(() => {
          });
        } else {
          this.dataSource.paginator = this.paginator;
        }
      });
    });

  }
}
