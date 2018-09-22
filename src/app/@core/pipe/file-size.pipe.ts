import { Pipe, PipeTransform } from '@angular/core';

/*
 * Convert bytes into largest possible unit.
 * Takes an precision argument that defaults to 2.
 * Usage:
 *   bytes | fileSize:precision
 * Example:
 *   {{ 1024 |  fileSize}}
 *   formats to: 1 KB
*/
@Pipe({name: 'fileSize'})
export class UizaFileSizePipe implements PipeTransform {
  private units = [
    'bytes',
    'KB',
    'MB',
    'GB',
    'TB',
    'PB'
  ];
  transform(bytes: number = 0, precision: number = 2 ) : string {
    if ( isNaN( parseFloat( String(bytes) )) || ! isFinite( bytes ) )
      return '';
    if(!bytes) return '';
    if(bytes === 0) return '0 bytes';
    let unit = 0;
    while ( bytes >= 1024 ) {
      bytes /= 1024;
      unit ++;
    }
    // while ( bytes >= 1000 ) {
    //   bytes /= 1000;
    //   unit ++;
    // }
    return bytes.toFixed( + precision ) + ' ' + this.units[ unit ];
  }
}