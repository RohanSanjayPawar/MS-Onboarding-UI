import { Component, OnInit, ElementRef } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Chart } from 'chart.js';  
import { OnboardeeService } from 'src/app/service/onboardee.service'

@Component({
  selector: 'app-experience-chart',
  templateUrl: './experience-chart.component.html',
  styleUrls: ['./experience-chart.component.scss']
})
export class ExperienceChartComponent implements OnInit {
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
    this.makeChart();
  }

  makeChart() {
    var map = new Map();
    this.user = this.sessionStorage.retrieve("user");
    this.onboardeeService.getAllOnboardee().subscribe((data) => {
      data.forEach(x => {  
        if(map.has(x.experience)) {
          map.set(x.experience, map.get(x.experience) + 1);
        } else {
          map.set(x.experience, 1);
        }
        this.total++;
      });

      for (let key of map.keys()) {
        this.role.push(key);
        this.demand.push(map.get(key));
      }

      for(var i=0;i<this.role.length;i++) {
        this.color[i] = this.dynamicColors();
      }


      let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas4`);
      this 
      this.doughnutChart.push(new Chart(htmlRef, {  
        type: 'doughnut',  
        data: {  
          labels: this.role,  
          datasets: [  
            {  
              data: this.demand, 
              label: "Experience Level Count", 
              borderColor: 'black',
              backgroundColor: this.color,
              fill: true  
            }  
          ]  
        },  
        options: {  
          legend: {  
            display: false  
          },  
          scales: {  
            xAxes: [{  
              display: false  
            }],  
            yAxes: [{  
              display: false  
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
