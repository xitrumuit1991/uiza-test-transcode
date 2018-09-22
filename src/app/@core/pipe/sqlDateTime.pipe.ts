import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'
@Pipe({ name: 'sqlDatetime' })
export class UizaSQLDatetimeTransform implements PipeTransform {
  transform(value: any, args?: any[]): any {
    return moment(value).utc().format('MM/DD/YYYY HH:mm')
  }
}