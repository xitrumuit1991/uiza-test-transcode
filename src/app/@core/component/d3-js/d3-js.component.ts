import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import * as d3 from "d3";

@Component({
  selector: 'uiza-d3-js',
  templateUrl: './d3-js.component.html',
  styleUrls: ['./d3-js.component.scss']
})
export class UizaD3JsComponent implements OnInit, AfterViewInit {

  settingColor = {
    "orange": {hex: '#FA831E', rbga: 'rgba(250, 131, 30, 1)'},
    "blue": {hex: '#21C4FB', rbga: 'rgba(33, 196, 251, 1)'},
    "green": {hex: '#4CEB82', rbga: 'rgba(76, 235, 130, 1)'},
    "purple": {hex: '#814AC4', rbga: 'rgba(129, 74, 196, 1)'},
  };

  Stockss: chartItem[] = [
    {date: new Date("2010-01-01"), value: 12},
    {date: new Date("2010-02-01"), value: 19},
    {date: new Date("2010-03-01"), value: 3},
    {date: new Date("2010-04-01"), value: 5},
    {date: new Date("2010-05-01"), value: 2},
    {date: new Date("2010-06-01"), value: 3},
    {date: new Date("2010-07-01"), value: 12},
    {date: new Date("2010-08-01"), value: 19},
    {date: new Date("2010-09-01"), value: 3},
    {date: new Date("2010-10-01"), value: 5},
    {date: new Date("2010-11-01"), value: 2},
    {date: new Date("2010-12-01"), value: 3},
  ];

  @Input() settings: any = {
    chartID: 'myChart',
    data: [10,50,80,30,40],
    lineColor: 'purple',
    pointColor: 'white',
    chartTitle: 'Custom Chart Title',
    width: '400px',
    height: '400px',
    pieWidth:300,
  };
  @ViewChild('chartContent') chartContent: ElementRef;

  title: string = 'D3.js with Angular 2!';
  subtitle: string = 'Line Chart';

  private margin = {top: 20, right: 20, bottom: 30, left: 50};
  private width: number;
  private height: number;
  private x: any;
  private y: any;
  private svg: any;
  private line: d3.Line<[number, number]>;


  constructor() {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ngOnInit() {
    this.initSvg();
    this.initAxis();
    this.drawAxis();
    this.drawLine();
    this.drawPie();
    this.drawDot();
  }

  private initSvg() {
    this.svg = d3.select("svg")
      .append("g")
      .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
  }

  private initAxis() {
    this.x = d3.scaleTime().range([0, this.width]);
    this.y = d3.scaleLinear().range([this.height, 0]);
    this.x.domain(d3.extent(this.Stockss, (d) => d.date ));
    this.y.domain([0, d3.max(this.Stockss, (d) => d.value )]);
  }

  private drawAxis() {

    this.svg.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.x));

    this.svg.append("g")
      .attr("class", "axis axis--y")
      .call(d3.axisLeft(this.y))
      .append("text")
      .attr("class", "axis-title")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Price ($)");
  }

  private drawLine() {
    this.line = d3.line()
      .x( (d: any) => this.x(d.date) )
      .y( (d: any) => this.y(d.value) );

    this.svg.append("path")
      .datum(this.Stockss)
      .attr("class", "line")
      .attr("d", this.line);
  }
  private drawDot() {
    this.svg.selectAll("dot")
      .data(this.Stockss)
      .enter().append("circle")
      .attr("r", 3.5)
      .attr("cx", (d: any) => this.x(d.date) )
      .attr("cy", (d: any) => this.y(d.value) );
  }

  private drawPie(){
    console.log(this.settings.pieWidth)
    var canvas=d3.select('.d3js-pie')
      .attr('width',this.settings.pieWidth+'px')
      .attr('height',this.settings.pieWidth+'px')
    var group =canvas.append('g')
      .attr("transform","translate("+this.settings.pieWidth/2+","+this.settings.pieWidth/2+")")
    var pie=d3.pie()
      .value(d=>{
        return d})
    var color=d3.scaleOrdinal(d3.schemeCategory10)

    var arc=d3.arc()
      .innerRadius(0)
      .outerRadius(this.settings.pieWidth/2)

    var arcs=group.selectAll(".arc")
      .data(pie(this.settings.data))
      .enter()
      .append('g')
      .attr("class","arc")
    console.log('arcs 12345678901234567890',arcs)
    arcs.append("path")
      .attr("d",arc)
      .attr("fill",(d=>{
        return color(d.data)
      }))

  }



  ngAfterViewInit() {
    // this.drawChart();
  }

  drawChart() {
    let ctx = document.getElementById(this.settings.chartID);
    if (this.settings.type === 'pie') {
    }
  }

}

export interface chartItem {
  date: Date,
  value: number
}


