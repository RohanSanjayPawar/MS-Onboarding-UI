import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OnboardeeService } from 'src/app/service/onboardee.service';
import { DemandService } from 'src/app/service/demand.service';
import { SessionStorageService } from 'ngx-webstorage';

export interface Onboardee {
  uid: number;
  demandUid: number;
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
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: Onboardee) {
      if(this.data.firstName !== "") {
        this.edit = true;
        
        for(var i=0;i<this.data.skillSet.length;i++) {
          if(this.data.skillSet[i] === "Angular") {
            this.angular = true;
          }

          if(this.data.skillSet[i] === "Java") {
            this.java = true;
          }

          if(this.data.skillSet[i] === "Spring") {
            this.spring = true;
          }

          if(this.data.skillSet[i] === "Project Planning") {
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
      this.skillSet.push("Project Planning");
    }

    this.data.skillSet = this.skillSet;
    var user = this.sessionStorage.retrieve("user");
    this.demandService.filterDemands(user.uid, this.data).subscribe((demands) => {
      if(demands.length === 0) {
        this._snackBar.open('No Demands found for the onboardee', 'Go Back', {
          duration: 2000,
        });
      } else {
        console.log(demands);
        this.demands = demands;
        this.demand = false;
      }
    })
  }

  goBack() {
    this.demand = true;
  }

  close(): void {
    this.sessionStorage.store("changed", false);
    this.dialogRef.close();
  }

  addOnboardee() {
    this.data.skillSet = this.skillSet;
    this.data.demandId = this.demandSelected;
    this.onboardeeService.addOnboardee(this.data).subscribe(() => {
      var demandUid = 0;
      
      for(var i=0;i<this.demands.length;i++) {
        if(this.demands[i].uid === this.data.demandId) {
          demandUid = this.demands[i].demandUid;
          break;
        }
      }

      this.demandService.updateDemands(demandUid).subscribe(() => {
        console.log(demandUid);
        this.sessionStorage.store("changed", true)
        this.dialogRef.close();
      });
    })
  }

  editOnboardee() {
    this.onboardeeService.updateOnboardee(this.data.uid, this.data).subscribe(() => {
      this.sessionStorage.store("changed", true);
      this.dialogRef.close();
    });
  }

  validations() {
    if(this.data.firstName === "" || this.data.lastName === "" || this.data.webLoginId === "" || this.data.status === "" || this.data.backgroundCheckStatus === "") {
      return false;
    }

    if(!this.java && !this.angular && !this.spring && !this.projectManager) {
      return false;
    }

    var patt = new RegExp("[0-9]+");

    if(patt.test(this.data.firstName) || patt.test(this.data.lastName) || patt.test(this.data.status) || patt.test(this.data.backgroundCheckStatus)) {
      return false;
    }

    return true;
  }

  demandCheck() {
    return this.data.demandId > 0;
  }
}
