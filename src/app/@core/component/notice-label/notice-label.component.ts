import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'uiza-notice-label',
  templateUrl: './notice-label.component.html',
  styleUrls: ['./notice-label.component.scss']
})
export class UizaNoticeLabelComponent implements OnInit {



  @Input() source: any = {
    button: true,
    buttonName: 'Change plan',
    type: 'primary',
    title: 'Your Current Plan : Individual Developer',
    value:  'You will get 20 Credit for every charged for subscription at 19.99 USD . This will be auto charge per month if your current Uiza Coin is less than fee.',
    onClick:()=>{
      console.log('on click button')
    }
  };

  constructor() {
  }

  ngOnInit() {

  }

}
