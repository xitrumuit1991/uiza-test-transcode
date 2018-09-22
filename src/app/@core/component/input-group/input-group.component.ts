import {Component, Input, EventEmitter, Output,} from '@angular/core';
import * as moment from 'moment'
import  { FormControl, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

@Component({
  selector: 'app-uiza-group-input',
  styleUrls: ['./input-group.component.scss'],
  templateUrl: './input-group.component.html',
})
export class UizaInputGroup {
  @Input() uizaModel:any = [{
    name :'',
  }];

  @Output() uizaChange = new EventEmitter();

  valueChange = ()=>{
    this.uizaChange.emit(this.uizaModel);
  }

  minusOldValue(ite){
    console.log(this.uizaModel);
    if(this.uizaModel && this.uizaModel.length === 0){
      this.uizaModel.push(
        {name:'',unValid: false}
      );
      this.valueChange();
    }
    if(this.uizaModel && this.uizaModel.length > 0){
      let index = _.findIndex(this.uizaModel, ite);
      if(index > -1) {
        this.uizaModel.splice(index,1);
        this.valueChange();
      }
    }
  }
  addNewValue(){
    console.log(this.uizaModel);
    if(this.uizaModel && this.uizaModel.length === 0){
      this.uizaModel.push(
        {name:'',unValid: false}
      );
      this.valueChange();
    }
    if(this.uizaModel && this.uizaModel.length > 0){
      let index = _.findIndex(this.uizaModel, {name : ''});
      if(index === -1){
        this.uizaModel.push(
          {name:'',unValid: false}
        );
        this.valueChange();
      }
    }
  }

}
