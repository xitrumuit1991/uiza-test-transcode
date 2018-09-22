import { Pipe, PipeTransform } from '@angular/core';
@Pipe({ name: 'uizaNumber' })
export class UizaNumberTransform implements PipeTransform {
  transform(value: any, exponent: any): any {
    let exponents =['',2]
    if (!isNaN(value)) {
      exponents = (exponent || ',2' ).split(',')
      value = parseFloat(value)
    }
    try {
      value = value.toFixed(exponents[1] || 2).replace(/./g, function (c, i, a) {
        return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
      });
    } catch (e) {
    }
    return `${exponents[0]}${value}`
    // return value;
    // we'll put our functional code in here...
  }
}