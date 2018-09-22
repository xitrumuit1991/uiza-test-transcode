import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { Chart } from 'chart.js';
import {UizaCardColorComponent} from '../card-color/card-color.component';

@Component({
  selector: 'uiza-chart-js',
  templateUrl: './chart-js.component.html',
  styleUrls: ['./chart-js.component.scss']
})
export class UizaChartJsComponent implements OnInit, AfterViewInit {
  myChart:any
  _custom:any
  @ViewChild('chartContent') chartContent: ElementRef;
  isRendered:any = false;
  settingColor = {
    "orange": {hex: '#FA831E', rbga: 'rgba(250, 131, 30, 1)'},
    "blue": {hex: '#21C4FB', rbga: 'rgba(33, 196, 251, 1)'},
    "green": {hex: '#4CEB82', rbga: 'rgba(76, 235, 130, 1)'},
    "purple": {hex: '#814AC4', rbga: 'rgba(129, 74, 196, 1)'},
  };
  _settings: any = {
    chartID: 'myChart',
    data: [],
    labels: [],
    lineColor: 'purple',
    pointColor: 'white',
    chartTitle: 'Custom Chart Title',
    width: '200px',
    height: '200px',
  };

  mapCorlor = (stringColor) => {
    if(this.settingColor[stringColor]) {
      return this.settingColor[stringColor];
    } else {
      return this.settingColor["orange"];
    }
}
  @Input('custom') set custom(value){
    this._custom=value;
    if(this.isRendered)
      this.drawChart();
  }
  get custom() {
    return this._custom;
  }
  @Input('settings') set settings(value) {
    // console.log("set setting ", value)
    this._settings = value;
    if(this.isRendered)
    this.drawChart();
  }

  get settings() {
    return this._settings;
  }




  constructor() { }

  ngOnInit() {
    // console.log('drawchart');
  }



  async ngAfterViewInit() {
    // console.log("ngAfterViewInit")
    await document.getElementById(this.settings.chartID);
    this.drawChart();
    this.isRendered = true;
  }
  drawChart() {
    let ctx =document.getElementById(this.settings.chartID);
    if(ctx)
    {if (this.settings.type==='pie'){
        this.myChart = new Chart(ctx,{
        type: 'pie',
        data: {
          labels: this.settings.labels!=null?this.settings.labels:['Success','Error'],
          datasets: [{
            data: this.settings.data,
            backgroundColor:this.settings.pieColor!=null?this.settings.pieColor:["#77C32D","#FF7373"],
            borderColor: this.settings.pieboderColor!=null?this.settings.pieboderColor:["#77C32D","#FF7373"],
            borderWidth: 0,
            // hoverBackgroundColor:"",
            // hoverBorderColor:"",
            // hoverBorderWidth:"",
          }]
        },
        options: {
          legend: {
            position: 'right',
            display: false,
            labels: {
              fontColor: '#FA831E',
              defaultFontFamily: 'IBM Plex Sans',
              // defaultFontSize: 20,
            }
          },
          cutoutPercentage:0,
          rotation:-0.5 * Math.PI,
          circumference:2 * Math.PI,
          animation:{
            animateRotate:true,
            animateScale:false,
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem,data) {
                return data.datasets[0].data[tooltipItem.index] +'%' ;
              }
            }
          },
        }
      })}
    else if(this.settings.type==='custom'){
      this.myChart= new Chart(ctx,this.custom)
    }
    else {
      this.myChart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: this.settings.labels,
          datasets: [{
            data: this.settings.data,
            backgroundColor: [
              this.mapCorlor(this.settings.lineColor).rbga,
            ],
            borderColor: [
              this.mapCorlor(this.settings.lineColor).rbga,
            ],
            borderWidth: 2,
            lineTension: this.settings.lineTension != null ? this.settings.lineTension : 0.4,
            fill: false,
            pointBackgroundColor: 'rgba(255, 255, 255, 1)',
            pointHoverBackgroundColor: this.mapCorlor(this.settings.pointColor).rbga,
            pointHoverRadius: 4,
            pointHoverBorderColor: this.mapCorlor(this.settings.pointColor).rbga,
          }]
        },

        options: {
          title: {
            display: true,
            text: this.settings.chartTitle,
            fontColor: this.mapCorlor(this.settings.lineColor).hex,
            fontFamily: 'IBM Plex Sans',
            fontSize: 14,
            position: 'top',
            horizontalAlign: 'left'
          },
          maintainAspectRatio: false,
          responsive: true,
          legend: {
            position: 'right',
            display: false,
            labels: {
              fontColor: '#FA831E',
              defaultFontFamily: 'IBM Plex Sans',
              // defaultFontSize: 20,
            }
          },
          scales: {
            yAxes: [{
              ticks: {
                display: this.settings.yAxes != null ? this.settings.yAxes : true,
                beginAtZero: true,
                gridLines: {
                  display: false
                }
              },
              xAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Month'
                },
                gridLines: {
                  display: false,
                  color: "black"
                },
              }],
              yAxes: [{
                display: true,
                scaleLabel: {
                  display: true,
                  labelString: 'Value'
                },
                gridLines: {
                  display: false
                }
              }],
              gridLines: {
                // Boolean - if true, show the grid lines
                display: this.settings.yGridLines != null ? this.settings.yGridLines : true
              }
            }
            ],
            xAxes: [{
              gridLines: {
                display: this.settings.xGridLines != null ? this.settings.xGridLines : true
              },
              ticks: {
                display: this.settings.xAxes != null ? this.settings.xAxes : true,
              }
            }
            ]
          },
          tooltips: {
            callbacks: {
              label: function (tooltipItem) {
                // console.log('asdasdasd',tooltipItem.yLabel)
                // let exponents =['',2]
                //  console.log('dmasmdasmdsamamdamadmasdamdsmd', tooltipItem.yLabel.toFixed(exponents[1] || 2).replace(/./g, function (c, i, a) {
                //   return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
                // }))
                return Math.round(tooltipItem.yLabel * 10000)/10000;
              }
            }
          },
          elements: {
            line: {
              tension: 0,
            },
            point: {
              hoverRadius: 4,
              borderColor: this.mapCorlor(this.settings.pointColor).rbga,
              hitRadius: 2,
              backgroundColor: this.mapCorlor(this.settings.pointColor).rbga,
              radius: 3,
            }
          }
        }
      });
    }}
  }
}
