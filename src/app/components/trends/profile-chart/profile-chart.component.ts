import { Component, OnInit, ElementRef } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Chart } from 'chart.js';  
import { OnboardeeService } from 'src/app/service/onboardee.service';

@Component({
  selector: 'app-profile-chart',
  templateUrl: './profile-chart.component.html',
  styleUrls: ['./profile-chart.component.scss']
})
export class ProfileChartComponent implements OnInit {
  myChart:any;
  user: any;
  doughnutChart = [];
  role = ["Java", "Angular", "Spring", "Project Manager"];  
  demand = [0, 0, 0, 0];
  color = [];
  total = 0;

  red = 63;
  green = 81;
  blue = 181;

  constructor(
    private sessionStorage: SessionStorageService,
    private onboardeeService: OnboardeeService,
    private elementRef: ElementRef) { }

  ngOnInit() {
    this.user = this.sessionStorage.retrieve("user");
    this.onboardeeService.getAllOnboardee().subscribe((data) => {
      data.forEach(x => {  
        for(var i=0;i<x.skillSet.length;i++) {
          if(x.skillSet[i] === "Java") {
            this.demand[0]++;
          } else if(x.skillSet[i] === "Angular") {
            this.demand[1]++;
          } else if(x.skillSet[i] === "Spring") {
            this.demand[2]++;
          } else if(x.skillSet[i] === "Project Manager") {
            this.demand[3]++;
          }
        }
        this.total++;
      });

      for(var i=0;i<4;i++) {
        this.color[i] = this.dynamicColors();
      }
      let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas1`);
      this 
      this.doughnutChart.push(new Chart(htmlRef, {  
        type: 'doughnut',  
        data: {  
          labels: this.role,  
          datasets: [  
            {  
              data: this.demand, 
              label: "Count", 
              borderColor: 'black',
              backgroundColor: this.color,
              fill: true  
            }  
          ]  
        },  
        options: {  
          legend: {  
            display: true  
          },  
          scales: {  
            xAxes: [{  
              display: false  
            }],  
            yAxes: [{  
              display: true  
            }],  
          }  
        }  
      }));  
    });
  }

  dynamicColors() {
    if(this.red + 40 > 255) {
      this.red = 63;
    } else {
      this.red += 40;
    }

    if(this.blue + 12 > 255) {
      this.blue = 181;
    } else {
      this.blue += 12;
    }

    if(this.green + 18 > 255) {
      this.green = 81;
    } else {
      this.green += 18;
    }
    
    
    return "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
  };
}
