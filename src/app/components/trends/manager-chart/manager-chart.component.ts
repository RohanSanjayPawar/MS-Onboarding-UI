import { Component, OnInit, ElementRef } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Chart } from 'chart.js';  
import { OnboardeeService } from 'src/app/service/onboardee.service';

@Component({
  selector: 'app-manager-chart',
  templateUrl: './manager-chart.component.html',
  styleUrls: ['./manager-chart.component.scss']
})
export class ManagerChartComponent implements OnInit {
  myChart:any;
  user: any;
  barChart = [];
  role = [];  
  demand = [];
  color = [];
  total = 0;

  red = 63;
  green = 81;
  blue = 181;

  constructor(
    private sessionStorage: SessionStorageService,
    private onboardeeService: OnboardeeService,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.makeChart();
  }

  makeChart() {
    var map = new Map();
    this.user = this.sessionStorage.retrieve("user");
    this.onboardeeService.getAllOnboardee().subscribe((data) => {
      data.forEach(x => {  
        if(map.has(x.hiringManager)) {
          map.set(x.hiringManager, map.get(x.hiringManager) + 1);
        } else {
          map.set(x.hiringManager, 1);
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
      let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas3`);
      this 
      this.barChart.push(new Chart(htmlRef, {  
        type: 'pie',  
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
              display: false  
            }],  
          }  
        }  
      }));  
    });
  }

  dynamicColors() {
    if(this.red + 80 > 255) {
      this.red = 63;
    } else {
      this.red += 80;
    }

    if(this.blue + 24 > 255) {
      this.blue = 181;
    } else {
      this.blue += 24;
    }

    if(this.green + 36 > 255) {
      this.green = 81;
    } else {
      this.green += 36;
    }
    
    
    return "rgb(" + this.red + "," + this.green + "," + this.blue + ")";
  };

}
