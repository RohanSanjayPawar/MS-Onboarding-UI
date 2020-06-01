import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OnboardeeService } from 'src/app/service/onboardee.service';
import { DemandService } from 'src/app/service/demand.service';
import { SessionStorageService } from 'ngx-webstorage';

export interface Onboardee {
  uid: number;
  firstName: string;
  lastName: string;
  webLoginId: string;
  skillSet: any[];
  experience: number;
  status: string;
  backgroundCheckStatus: string;
  demandId: number
  etaForOnboarding: number;
  hiringManager: string;
  
}

@Component({
  selector: 'app-add-onboardee',
  templateUrl: './add-onboardee.component.html',
  styleUrls: ['./add-onboardee.component.scss']
})
export class AddOnboardeeComponent implements OnInit {

  angular = false;
  java = false;
  spring = false;
  projectManager = false;

  demand = true;

  skillSet: string[] = [];
  demands: any[] = [];
  demandSelected: any;

  edit = false;


  constructor(
    private dialogRef: MatDialogRef<AddOnboardeeComponent>,
    private onboardeeService: OnboardeeService,
    private sessionStorage: SessionStorageService,
    private demandService: DemandService,
    @Inject(MAT_DIALOG_DATA) public data: Onboardee) {
      if(this.data.firstName !== "") {
        this.edit = true;
        
        for(var i=0;i<data.skillSet.length;i++) {
          if(data.skillSet[i] === "Angular") {
            this.angular = true;
          }

          if(data.skillSet[i] === "Java") {
            this.java = true;
          }

          if(data.skillSet[i] === "Spring") {
            this.spring = true;
          }

          if(data.skillSet[i] === "Project Manager") {
            this.projectManager = true;
          }
        }
      }
    }

  ngOnInit() {
  }

  findDemand() {
    this.skillSet = [];

    if(this.angular) {
      this.skillSet.push("Angular");
    }
    
    if(this.java) {
      this.skillSet.push("Java");
    }

    if(this.spring) {
      this.skillSet.push("Spring");
    }

    if(this.projectManager) {
      this.skillSet.push("Project Manager");
    }

    this.data.skillSet = this.skillSet;
    var user = this.sessionStorage.retrieve("user");
    this.demandService.filterDemands(user.uid, this.data).subscribe((demands) => {
      if(demands.length === 0) {
        alert("No Jobs Available");
      } else {
        this.demands = demands;
        this.demand = false;
      }
    })
  }

  goBack() {
    this.demand = true;
  }

  close(): void {
    this.dialogRef.close();
  }

  addOnboardee() {
    this.data.skillSet = this.skillSet;
    this.data.demandId = this.demandSelected;
    this.onboardeeService.addOnboardee(this.data).subscribe(() => {
      this.dialogRef.close();
    })
  }

  editOnboardee() {
    this.onboardeeService.updateOnboardee(this.data.uid, this.data).subscribe(() => {
      this.dialogRef.close();
    })
  }
}
