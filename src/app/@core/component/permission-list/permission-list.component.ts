import {Component, Input, EventEmitter, Output,} from '@angular/core';
import * as moment from 'moment'
import  { FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-uiza-permission-list',
  styleUrls: ['./permission-list.component.scss'],
  templateUrl: './permission-list.component.html',
})
export class UizaPermissionList {
  @Input() source: any =
    {
      on:true,
      groupTitle:"Admin API Feature",
      groupDescription:"Permision Admin API",
      items:[
        {
          title:"Create",
          value:"v1.admin.api.create",
          description:"Create api feature",
        },
        {
          title:"Get List",
          value:"v1.admin.api.list",
          description:"Get list API feature",
        },
        {
          title:"Create",
          value:"v1.admin.api.create",
          description:"Create api feature",
        },
        {
          title:"Create",
          value:"v1.admin.api.create",
          description:"Create api feature",
        },
        {
          title:"Create",
          value:"v1.admin.api.create",
          description:"Create api feature",
        },
        {
          title:"Create",
          value:"v1.admin.api.create",
          description:"Create api feature",
        },
      ]
    }
  ;
  dataout:any=[]
  @Input() setting:any={
    onChange(selectall,data){
      if (selectall!='all')
        this.data.push(data)
      this.uizaChange.emit(data);
    },

  }
  @Input() uizaModel: any = false;

  @Input() name;
  @Output() uizaChange = new EventEmitter();
  onSelectChange = (value, data) => {
    this.selectFunction(value,data)
  }
  selectFunction (value, data) {
    console.log('Select', data);
    console.log('value1 ', value);
    data.isSelected = value;
    console.log('source ', this.source);
  }
  onSelectAll = (value) => {
    this.source.items.forEach((item) => {
      item.isSelected = value
    })
  }
}
