import {Component, Input, EventEmitter, Output} from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
import {toString} from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-uiza-date-picker-advance',
  styleUrls: ['./date-picker-advance.component.scss'],
  templateUrl: './date-picker-advance.component.html',
})
export class UizaDatePickerAdvanceComponent {
  @Input() settings: any = {
    datepicker: {
      onChange: (data)=>{
        console.log(data)
      },
      multiple: true,
      single: true,},
    filterday: true,
    filtertime:true,
  };

  @Input() uizaModel: any = false;

  @Input() name;

  @Output() uizaChange = new EventEmitter();

  week(value) {
    let toDay = new Date();
    let fromDay = new Date(toDay.getTime() - 1000 * value * 60 * 60 * 24 * 7);
    let fromday = moment(toString(fromDay)).format('YYYY-MM-DD 00:00:00');
    let today = moment(toString(toDay)).format('YYYY-MM-DD 23:59:59');
    let day = {'fromday': fromday, 'today': today};
    console.log(day);
    this.uizaChange.emit(day);
  }

  year(value) {
    let toDay = new Date();
    let fromDay = new Date(toDay.getTime() - 1000 * value * 60 * 60 * 24 * 365);
    let fromday = moment(toString(fromDay)).format('YYYY-MM-DD 00:00:00');
    let today = moment(toString(toDay)).format('YYYY-MM-DD 23:59:59');
    let day = {'fromday': fromday, 'today': today};
    console.log(day);
    this.uizaChange.emit(day);
  }

  datechange = (value) => {
    let dataout = value;
    if (_.isArray(dataout)) {
      let toDay = dataout[1];
      let fromDay = dataout[0];
      let fromday = moment(fromDay).format('YYYY-MM-DD 00:00:00');
      let today = moment(toDay).format('YYYY-MM-DD 23:59:59');
      let day = {'fromday': fromday, 'today': today};
      console.log(day);
      this.uizaChange.emit(day);
    }
    else {
      dataout = moment(dataout).format('YYYY-MM-DD 00:00:00');
      console.log(dataout);
      this.uizaChange.emit(dataout);
    }

  };
  // change=(value)=>{
  //   console.log(value)
  // }
  // bsValue = new Date();
  // bsRangeValue: Date[];
  // maxDate = new Date();
  constructor() {
    // this.maxDate.setDate(this.maxDate.getDate() + 7);
    // this.bsRangeValue = [this.bsValue, this.maxDate];

  }
}
