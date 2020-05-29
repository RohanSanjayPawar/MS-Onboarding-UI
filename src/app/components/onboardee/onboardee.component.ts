import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Router } from '@angular/router';
import { SessionStorageService } from 'ngx-webstorage';
import { OnboardeeService } from 'src/app/service/onboardee.service';

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
  ) { }

  public setTitle() {
    this.titleService.setTitle(this.title);
  }

  ngOnInit() {
    if(!this.sessionStorage.retrieve("loggedIn")) {
      this.router.navigate(['/home']);
    } else {
      this.onboardeeService.getAllOnboardee().subscribe((data) => {
        this.displayedColumns = ['uid', 'firstName', 'lastName',  'webLoginId', 'hiringManager', 'joiningLocation', 'skillSet', 'status', 'backgroundCheckStatus', 'etaForOnboarding'];
        console.log(data);
        this.dataSource = data;
      });
    }
    this.setTitle();
  }

}
