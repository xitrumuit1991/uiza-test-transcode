import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';
@Pipe({ name: 'nameEntity' })
export class UizaNameEntityTransform implements PipeTransform {
  transform(value: any): any {
      let extName = [
        //video
        '.mp4',
        '.mkv',
        '.mov',
        '.avi',
        '.ts',
        '.webm',
        '.m4v',

        //audio
        '.aac',
        '.m4a',
        // '.mp4', //duplicate
        '.ac3',
        '.mp3',
        '.wav',
        '.dts',
        '.flac',
        '.m4a'
      ];
      if(!_.isEmpty(extName)){
        for(let i = 0; i < extName.length; i++){
          if (value && value.indexOf(extName[i]) >= 0)
            return value.substring(0, value.lastIndexOf('.'));
        }
      }
      return value;
  }
}
