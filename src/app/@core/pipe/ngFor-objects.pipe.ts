import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'objects'})
export class UizaNgForObjectTransform implements PipeTransform {
  transform(value: any, args?: any[]): any {
    let keyArr: any[] = Object.keys(value);
    return keyArr;
    // we'll put our functional code in here...
  }
}