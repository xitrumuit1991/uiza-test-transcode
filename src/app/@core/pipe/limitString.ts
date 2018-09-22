import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({ name: 'limitString' })
export class UizaLimitStringTransform implements PipeTransform {
  transform(value: any, limit: any): any {
    if(value.length > limit){
      return value.substring(0, limit) + '...';
    }else{
      return value;
    }

  }
}
