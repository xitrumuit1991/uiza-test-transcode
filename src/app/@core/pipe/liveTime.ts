import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({ name: 'liveTime' })
export class UizaLiveTimeTransform implements PipeTransform {
  transform(value: any): any {
    console.log(value);
    let now = new Date().getTime();
    let seconds = (now - value) / 1000;
    let hh = Math.floor(seconds / 3600)
    let mm = Math.floor(seconds / 60) % 60
    return (hh < 10 ? "0" : "") + hh + ":" + (mm < 10 ? "0" : "") + mm;
  }
}
