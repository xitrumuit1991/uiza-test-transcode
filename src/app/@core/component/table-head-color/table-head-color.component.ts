import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'uiza-table-head-color',
  templateUrl: './table-head-color.component.html',
  styleUrls: ['./table-head-color.component.scss']
})
export class UizaTableHeadColorComponent implements OnInit {
  defaultColor = 'blue';
  settingColor = {
    orange: {backGround: 'linear-gradient(307.84deg, #FAD961 0%, #F76B1C 100%)', boxShadow: '0 5px 15px 0 rgba(249,165,65,0.52)'},
    blue: {backGround: 'linear-gradient(95.86deg, #4FACFE 0%, #00F2FE 100%)', boxShadow: '0 5px 15px 0 rgba(21,223,254,0.44)'},
    green: {backGround: 'linear-gradient(112.63deg, #43E97B 0%, #43E97B 49.31%, #38F9D7 100%)', boxShadow: '0 5px 15px 0 rgba(91,246,145,0.66)'},
    purple: {backGround: 'linear-gradient(138.04deg, #3023AE 0%, #C86DD7 100%)', boxShadow: '0 5px 15px 0 rgba(156,88,203,0.53)'}
  };



  @Input() source: any = {
    color: 'blue',
    left: {title: 'Managed Minuted', value: ''},
    center: {title: 'Total Usage:', value: '120,000 Minutes'},
    right: {title: 'Total Amount:', value: '$200,000'},
  };

  constructor() { }

  ngOnInit() {
  }

}
