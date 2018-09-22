import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import _ from 'lodash';

@Component({
  selector: 'uiza-card-input',
  templateUrl: './card-input.component.html',
  styleUrls: ['./card-input.component.scss']
})
export class UizaCardInputComponent implements OnInit {

  imageSource = {
    Visa: 'visa-card.png',
    Master: 'master-card.png',
    Jcb: 'ico_jcb.png'
  }

  @Input() source: any = [
    { brand: 'visa', last4: '1234', exp_month: '12', exp_year: '2019', isDefault: 'true'},
    { brand: 'master', last4: '1234', exp_month: '12', exp_year: '2019', isDefault: 'false'},
    { brand: 'jcb', last4: '1234', exp_month: '12', exp_year: '2019', isDefault: 'false'}
  ]
  required = [];
  @Input() settings: any = {
    viewEnable: true,
    viewMode: true,
  };


  constructor() { }

  ngOnInit() {
    console.log("xxxx", this.source)
  }

}
