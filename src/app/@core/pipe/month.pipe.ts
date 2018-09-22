import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'
@Pipe({ name: 'month' })
export class UizaMonthTransform implements PipeTransform {
  transform(value: any, args?: any[]): any {
    console.log(value)
    return moment(value).format('MMMM YYYY')
    // return value;
    // we'll put our functional code in here...
  }
}