import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({ name: 'timeFormat' })
export class UizaTimeFormatTransform implements PipeTransform {
  transform(value: any): any {
    if(value)
      {let second = parseInt(value);
      let hh = Math.floor(second / 3600);
      let mm = Math.floor(second / 60) % 60;
      let ss = Math.floor(second % 60);
      return (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm + ":" + (ss < 10 ? "0" : "") + ss;}
    else{return '00:00:00'}
  }
}
