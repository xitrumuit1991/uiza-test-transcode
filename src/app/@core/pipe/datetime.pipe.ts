import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'
@Pipe({ name: 'datetime' })
export class UizaDatetimeTransform implements PipeTransform {
  transform(value: any, args?: any[]): any {
    return moment(value).format('MM/DD/YYYY HH:mm')
  }
}