import { Component, OnInit, ElementRef } from '@angular/core';
import { SessionStorageService } from 'ngx-webstorage';
import { Chart } from 'chart.js';  
import { OnboardeeService } from 'src/app/service/onboardee.service';

@Component({
  selector: 'app-location-graph',
  templateUrl: './location-graph.component.html',
  styleUrls: ['./location-graph.component.scss']
})
export class LocationGraphComponent implements OnInit {
  myChart:any;
  user: any;
  barChart = [];
  role = ["Mumbai", "Bangalore"];  
  demand = [0, 0];
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
    this.user = this.sessionStorage.retrieve("user");
    this.onboardeeService.getAllOnboardee().subscribe((data) => {
      data.forEach(x => {  
        if(x.joiningLocation === "Bangalore") {
          this.demand[1]++;
        } else {
          this.demand[0]++;
        }
        this.total++;
      });

      for(var i=0;i<2;i++) {
        this.color[i] = this.dynamicColors();
      }
      let htmlRef = this.elementRef.nativeElement.querySelector(`#canvas2`);
      this 
      this.barChart.push(new Chart(htmlRef, {  
        type: 'bar',  
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
            display: false 
          },  
          scales: {  
            xAxes: [{  
              display: true  
            }],  
            yAxes: [{
              ticks: {
                suggestedMin: 0,
                suggestedMax: 10
              },  
              display: true  
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
