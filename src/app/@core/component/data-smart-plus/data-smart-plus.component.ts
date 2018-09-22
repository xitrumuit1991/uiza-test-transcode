import {Component, Input, EventEmitter, Output, AfterViewInit,} from '@angular/core';
import * as moment from 'moment';
import {FormControl, FormGroup} from '@angular/forms';
import * as _ from 'lodash';
import {UizaCheckboxComponent} from '../checkbox/checkbox.component';
import {element} from 'protractor';

@Component({
  selector: 'app-uiza-data-smart-plus',
  styleUrls: ['./data-smart-plus.component.scss'],
  templateUrl: './data-smart-plus.component.html',
})
export class UizaDataSmartPlusComponent implements AfterViewInit {
  @Input() sources: any = [
    {dropdown: 'youtube', streamUrl: 'test', streamkey: 'test2'},
  ]
  ;
  @Input() required: any=[];
  @Input() disabled: any = false;
  @Input() settings: any = {
    onChange(selectall, data) {
      // if (selectall!='all')
      //   this.data.push(data)
      // this.uizaChange.emit(data);
    },
  };
  @Input() uizaModel: any = false;
  @Input() name;
  @Output() uizaChange = new EventEmitter();

//Todo create function
  minusOldValue(ite) {
    if (this.sources.length > 0) {
      var index = _.findIndex(this.sources, ite);
      if (index > -1) {
        this.sources.splice(index, 1);
      }
    }
  }

  addNewValue() {
    this.sources.push({});
  }

  checkValid=(item, val, idx) =>{
    let index = _.findIndex(this.required, ite => {
      return Object.keys(ite)[0] == this.name
    });
    if (index > -1) {
      if (this.required[index][this.name][idx]&&this.required[index][this.name][idx][val] == true)
        return 'is-invalid';
    }
  }

  ngAfterViewInit() {
    if (this.sources && this.sources.length == 0 && !this.disabled) {
      this.sources.push({});
    }
  }
}
