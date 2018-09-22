import {Component, Input, EventEmitter, Output,} from '@angular/core';
import * as moment from 'moment'
import  { FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash'
import {UizaCheckboxComponent} from '../checkbox/checkbox.component';
@Component({
  selector: 'app-uiza-data-plus',
  styleUrls: ['./data-plus.component.scss'],
  templateUrl: './data-plus.component.html',
})
export class UizaDataPlusComponent {
  @Input() sources: any = [
      {title:"", value:""},
    ]
  ;
  dataout:any=[]
  @Input() setting:any={
    onChange(selectall,data){
      // if (selectall!='all')
      //   this.data.push(data)
      // this.uizaChange.emit(data);
    },
  }
  @Input() uizaModel: any = false;

  @Input() name;
  @Output() uizaChange = new EventEmitter();
//Todo create function
  minusOldValue(ite){
    if (this.sources.length>0){
      var index=_.findIndex(this.sources,ite);
      if(index > -1) {this.sources.splice(index,1);
      }
    }
  }
  addNewValue() {
    this.sources.push({title:"", value:""})
  }
}
