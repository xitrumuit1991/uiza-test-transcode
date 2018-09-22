import {Component, Input, EventEmitter, Output,} from '@angular/core';
import * as moment from 'moment'
import  { FormControl, FormGroup } from '@angular/forms';
import {UizaMultiRadioComponent} from '../radio/multi/multi-radio.component';
import {UizaCheckboxComponent} from '../checkbox/checkbox.component';
@Component({
  selector: 'app-uiza-date-picker',
  styleUrls: ['./date-picker.component.scss'],
  templateUrl: './date-picker.component.html',
})
export class UizaDatePickerComponent {
  @Input() settings: any = {
    onChange: (data)=>{
    },
    multiple:true,
    single:true,
    singlecol:6,
    bsValue : new Date(),
    multiplecol:6,
    bsRangeValue: [],
  };
  myForm = new  FormGroup({
    myDateMulti: new FormControl(),
    myDateSingle: new FormControl()
  })
  @Input() uizaModel: any = false;

  @Input() name;
  @Output() uizaChange = new EventEmitter();

  change=(value)=>{
    console.log('value', value);
    this.settings.onChange(value);
  }
  // bsValue = new Date();
  // bsRangeValue: Date[];
  maxDate = new Date();
  constructor() {
    this.maxDate.setDate(this.maxDate.getDate() - 7);
    this.settings.bsRangeValue = [this.maxDate, this.settings.bsValue];
  }
}
