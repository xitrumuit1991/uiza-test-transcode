import { Injectable } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Http, Response, RequestOptions } from '@angular/http';
import * as _ from 'lodash';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ToasterModule, ToasterService, ToasterConfig, Toast } from 'angular2-toaster';

@Injectable()

export class UtilService {
  constructor(private _toasterService: ToasterService,
              private loadingBar: LoadingBarService) {
    this._toasterService = _toasterService;
  }

  notify(title:any = "", message:any = "", type = 'success', timeout = 5000) {
    title = (title && _.isString(title)) ? title : (title && _.isObject(title) ? JSON.stringify(title) : "");
    message = (message && _.isString(message)) ? message : (message && _.isObject(message) ? JSON.stringify(message) : "");
    let toast = {
      type: type,
      title: title,
      body: message,
      timeout: timeout
    };
    if(title) {
      this._toasterService.pop(toast);
    }
  }

  notifySuccess(title :any = "", message:any = "") {
    title = (title && _.isString(title)) ? title : (title && _.isObject(title) ? JSON.stringify(title) : "");
    message = (message && _.isString(message)) ? message : (message && _.isObject(message) ? JSON.stringify(message) : "");
    if(!_.isEmpty(title) )
      return this.notify(title, message, 'success');
    // if(title && _.isObject(title)) title = title.message || 'No title';
    // if (_.isObject(message))
    //   return this.notify(JSON.stringify(title), JSON.stringify(message), 'success');
    // return this.notify(title, message, 'success' );
  }

  notifyError(title :any = "", message:any = "") {
    title = (title && _.isString(title)) ? title : (title && _.isObject(title) ? JSON.stringify(title) : "");
    message = (message && _.isString(message)) ? message : (message && _.isObject(message) ? JSON.stringify(message) : "");
    if(!_.isEmpty(title) )
      return this.notify(title, message, 'error');
    // if(title && _.isObject(title)) title = title.message || 'No title';
    // if (_.isObject(message))
    //   return this.notify(JSON.stringify(title), JSON.stringify(message), 'error');
    // this.notify(title, message, 'error');
  }

  notifyWarning(title :any = "", message :any = "") {
    title = (title && _.isString(title)) ? title : (title && _.isObject(title) ? JSON.stringify(title) : "");
    message = (message && _.isString(message)) ? message : (message && _.isObject(message) ? JSON.stringify(message) : "");
    if(!_.isEmpty(title) )
      return this.notify(title, message, 'warning');
    // if(title && _.isObject(title)) title = title.message || 'No title';
    // if (_.isObject(message))
    //   return this.notify(JSON.stringify(title), JSON.stringify(message), 'warning');
    // this.notify(title, message, 'warning');
  }

  startLoading() {
    this.loadingBar.start();
  }

  stopLoading() {
    this.loadingBar.complete();
  }

  millisToMinutesAndSeconds(millis) {
    if (millis < 0)
      return '00 m 00 s';
    let minutes = Math.floor(millis / 60000);
    if(minutes > 6000){
      minutes = 6000;
    }
    let seconds = parseInt(((millis % 60000) / 1000).toFixed(0));
    // return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    return minutes + " m " + (seconds < 10 ? '0' : '') + seconds + ' s';
  }

  formatBytes(bytes) {
    if (!bytes || isNaN(bytes)) {
      return '';
    }
    if (bytes < 0)
      return '0 Byte';
    if (bytes < 1024) {
      return bytes.toFixed(1) + " Byte";
    }
    if (bytes < 1048576) {
      return ((bytes / 1024).toFixed(1)) + " KB";
    }
    if (bytes < 1073741824) {
      return ((bytes / 1048576).toFixed(1)) + " MB";
    }
    return ((bytes / 1073741824).toFixed(1)) + " GB";
  }

  stringToSlug(text) {
    text = text.toString().toLowerCase().trim();
    const sets = [
      { to: 'a', from: '[ÀÁÂÃÄÅÆĀĂĄẠẢẤẦẨẪẬẮẰẲẴẶ]' },
      { to: 'c', from: '[ÇĆĈČ]' },
      { to: 'd', from: '[ÐĎĐÞ]' },
      { to: 'e', from: '[ÈÉÊËĒĔĖĘĚẸẺẼẾỀỂỄỆ]' },
      { to: 'g', from: '[ĜĞĢǴ]' },
      { to: 'h', from: '[ĤḦ]' },
      { to: 'i', from: '[ÌÍÎÏĨĪĮİỈỊ]' },
      { to: 'j', from: '[Ĵ]' },
      { to: 'ij', from: '[Ĳ]' },
      { to: 'k', from: '[Ķ]' },
      { to: 'l', from: '[ĹĻĽŁ]' },
      { to: 'm', from: '[Ḿ]' },
      { to: 'n', from: '[ÑŃŅŇ]' },
      { to: 'o', from: '[ÒÓÔÕÖØŌŎŐỌỎỐỒỔỖỘỚỜỞỠỢǪǬƠ]' },
      { to: 'oe', from: '[Œ]' },
      { to: 'p', from: '[ṕ]' },
      { to: 'r', from: '[ŔŖŘ]' },
      { to: 's', from: '[ßŚŜŞŠ]' },
      { to: 't', from: '[ŢŤ]' },
      { to: 'u', from: '[ÙÚÛÜŨŪŬŮŰŲỤỦỨỪỬỮỰƯ]' },
      { to: 'w', from: '[ẂŴẀẄ]' },
      { to: 'x', from: '[ẍ]' },
      { to: 'y', from: '[ÝŶŸỲỴỶỸ]' },
      { to: 'z', from: '[ŹŻŽ]' },
      { to: '-', from: '[·/_,:;\']' }
    ];

    sets.forEach(set => {
      text = text.replace(new RegExp(set.from, 'gi'), set.to)
    });

    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/&/g, '-and-')         // Replace & with 'and'
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\--+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');             // Trim - from end of text
  }

  dataURItoBlob(dataURI, minetype = "application/octet-stream") {
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    let byteString = atob(dataURI.split(',')[1]);
    // separate out the mime component
    // mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
    //  write the bytes of the string to an ArrayBuffer
    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    let i = 0;
    while(i < byteString.length) {
      ia[i] = byteString.charCodeAt(i);
      i++;
    }
    // write the ArrayBuffer to a blob, and you're done
    let bb = new Blob([ab], {type: minetype});
    return bb;
  }

  copyToClipboard(text, callbackSuccess, callbackError, elm) {
    const input = document.createElement('input');
    input.value = text;

    if (elm) {
      elm.appendChild(input);
    } else {
      document.body.appendChild(input);
    }

    input.focus();
    input.select();

    if (document.queryCommandSupported('copy')) {
      try {
        document.execCommand('copy');
        if (typeof callbackSuccess === 'function') {
          callbackSuccess();
        }
      } catch(t) {
        if (typeof callbackError === 'function') {
          callbackError();
        }
      }
    } else {
      if (typeof callbackError === 'function') {
        callbackError();
      }
    }

    if (elm) {
      elm.removeChild(input);
    } else {
      document.body.removeChild(input);
    }
  }
}
