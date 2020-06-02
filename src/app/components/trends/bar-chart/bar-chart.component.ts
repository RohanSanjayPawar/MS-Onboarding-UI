import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';  
import { DemandService } from 'src/app/service/demand.service';
import { SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

  user: any;
  barchart = [];
  role = [];  
  demand = [];
  color = [];
  total = 0;

  red = 63;
  green = 81;
  blue = 181;

  constructor(
    private demandService: DemandService,
    private sessionStorage: SessionStorageService
  ) { }

  ngOnInit() {
    this.user = this.sessionStorage.retrieve("user");
    this.demandService.getDemands().subscribe((data) => {
      data.forEach(x => {  
        this.role.push(x.role);  
        this.demand.push(x.total); 
        this.color.push(this.dynamicColors()); 
        this.total += x.total;
      }); 
      this 
      this.barchart.push(new Chart('canvas', {  
        type: 'bar',  
        data: {  
          labels: this.role,  
          datasets: [  
            {  
              data: this.demand, 
              label: "Total demand", 
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
              display: true  
            }],  
            yAxes: [{  
              ticks: {
                suggestedMin: 10,
                suggestedMax: 40
              },
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
