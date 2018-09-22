import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'uiza-card-color',
  templateUrl: './card-color.component.html',
  styleUrls: ['./card-color.component.scss']
})
export class UizaCardColorComponent implements OnInit {
  defaultColor = 'blue'
  settingColor = {
    orange: {
      cardColor: { backGround: 'linear-gradient(307.84deg, #FAD961 0%, #F76B1C 100%)', boxShadow: '0 5px 15px 0 rgba(249,165,65,0.65)' },
      oval1Color: { backGround: 'linear-gradient(161.89deg, #FE8300 0%, rgba(240, 78, 30, 0) 100%)', boxShadow: '0 8px 30px 0 rgba(30, 135, 240, 0.2)' },
      oval2Color: { backGround: 'linear-gradient(156.45deg, #F9A139 14.93%, #ffffff 100%)', boxShadow: '0 8px 30px 0 rgba(30, 135, 240, 0.2)' }
    },
    blue: {
      cardColor: { backGround: 'linear-gradient(95.86deg, #4FACFE 0%, #00F2FE 100%)', boxShadow: '0 5px 15px 0 rgba(21,223,254,0.44)' },
      oval1Color: { backGround: 'linear-gradient(161.89deg, #87d0e0 0%, rgba(135, 208, 224, 0) 100%)', boxShadow: '0 8px 30px 0 rgba(30, 135, 240, 0.2)' },
      oval2Color: { backGround: 'linear-gradient(156.45deg, #97c0e8 14.93%, #ffffff 100%)', boxShadow: '0 8px 30px 0 rgba(30, 135, 240, 0.2)' }
    },
    green: {
      cardColor: { backGround: 'linear-gradient(112.63deg, #43E97B 0%, #43E97B 31.23%, #38F9D7 100%)', boxShadow: '0 5px 15px 0 rgba(91,246,145,0.66)' },
      oval1Color: { backGround: 'linear-gradient(161.89deg, rgb(45, 214, 144) 0%, rgba(240, 78, 30, 0) 100%)', boxShadow: '0 8px 30px 0 rgba(30, 135, 240, 0.2)' },
      oval2Color: { backGround: 'linear-gradient(156.45deg, rgb(84, 212, 31) 14.93%, #ffffff 100%)', boxShadow: '0 8px 30px 0 rgba(30, 135, 240, 0.2)' }

    },
    purple: {
      cardColor: { backGround: 'linear-gradient(132.07deg, #3023AE 0%, #C86DD7 100%)', boxShadow: '0 5px 15px 0 rgba(156,88,203,0.44)' },
      oval1Color: { backGround: 'linear-gradient(161.89deg, rgb(145, 0, 254) 0%, rgba(240, 78, 30, 0) 100%)', boxShadow: '0 8px 30px 0 rgba(30, 135, 240, 0.2)' },
      oval2Color: { backGround: 'linear-gradient(156.45deg, rgb(157, 57, 249) 14.93%, #ffffff 100%)', boxShadow: '0 8px 30px 0 rgba(30, 135, 240, 0.2)' }
    },
  }

  @Input() source: any = {
    color: 'blue',
    title: 'Live Channel Minutes',
    value: [
      {
        title: 'No Encode',
        value: '$3,000,000',
      },
      {
        title: 'Encoded',
        value: '$700',
      }
    ]
  };

  constructor() {
  }

  ngOnInit() {

  }

}
