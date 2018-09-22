import {
  Component, ViewChild, TemplateRef, Input, EventEmitter, Output, OnInit, SimpleChanges,
  NgZone
} from '@angular/core';
import * as async from 'async';
import * as _ from 'lodash';
import * as uuid from 'uuid';
import { ApiService, UtilService } from "../../../@service/index";
import { Router } from "@angular/router";
import { Http, HttpModule } from "@angular/http";
import { environment } from "../../../../environments/environment";
declare let AWS;

@Component({
  selector: 'app-uiza-upload-static',
  styleUrls: ['./upload-static.component.scss'],
  templateUrl: './upload-static.component.html',
})
export class UizaUploadStaticComponent implements OnInit {
  @Output() uploaded: any = new EventEmitter();
  @Input() set config(value) {
    if(value){
      this._config = value
    }
    if(!!this._config.resetInput) {
      this.dataImage = {}
    }
  }
  @Input() imageURL;

  _config: any = {
    class: '',
    title: '',
    uploading: (percent) => {
      console.log('percent', percent);
    },
    complete: (data) => {
      console.log('data', data);
    },
    showProgressBar: true,
    resetInput: false
  };
  itemFile: any = {
    name: '',
    type: '',
    size: 0,
    body: '',
    url: '',
    ext: ''
  };



  get config():any {
    return this._config
  }

  dataImage: any;

  progressLoading: any = 0;

  constructor(
    private apiService: ApiService,
    private utilService: UtilService,
    private router: Router,
    private http: Http,
  ) {
  }

  ngOnInit() {
    if(this.imageURL)
    {
      this.dataImage = {};
      this.dataImage.url = this.imageURL;
    }
  }

  uploadS3() {
    let formData, xhr;
    let self = this;
    formData = new FormData();
    formData.append("index", 1);
    formData.append("file", this.itemFile.body);
    xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.upload.onprogress = function (event) {
      let progress: any = event.loaded / event.total * 100;
      // console.log(progress);
      self.progressLoading = progress;
      // console.log(this.progressLoading);
      // if (this.config && typeof (this.config.uploading === 'function'))
      //   this.config.uploading(progress);
    };
    xhr.open('POST', `${window.location.protocol}//${environment.apiUrl}/api/private/v3/media/file/upload-to-s3`, true);
    xhr.setRequestHeader("Authorization", window.localStorage.uiza_token);
    xhr.send(formData);
    xhr.onload = (e) => {
      // console.log(e);
      // console.log(xhr);
      // console.log(xhr.response);
      if (xhr.response && xhr.response.data && xhr.status === 200) {
        console.log("uploadS3 success : ", e)
        this.progressLoading = 100;
        this.config.complete(xhr.response.data);
        this.dataImage = xhr.response.data;
        this.uploaded.emit(xhr.response.data.url);
      } else {
        console.log("uploadS3 fail : ", e)
      }
    };
  }

  fileChanged(e) {
    console.log(e);
    if (e.target.files && e.target.files.length > 0) {
      this.dataImage = '';
      this.progressLoading = 0;
      let itemChoose = e.target.files[0];
      if (!itemChoose)
        return console.error('can not get file when choose file');
      this.itemFile = {
        name: itemChoose.name,
        type: itemChoose.type,
        size: itemChoose.size,
        body: itemChoose,
        url: ''
      };
      console.log('this.itemFile', this.itemFile);
      this.uploadS3();
      e.target.files = null;
      // var width=$(".choose-avatar").css('width')
      // $(".choose-avatar").css('height',width)
      // console.log($(".choose-avatar").css('height'))
      // $(".choose-avatar").css('background-size',width)
      // console.log(width)
    }

  }
  changeAva(){
    var width=($(".choose-avatar").width()-$(".choose-avatar").height())/2
    // $(".choose-avatar").css('height',width)
    $(".choose-avatar").css('padding-top',width+2+"px")
    $(".choose-avatar").css('padding-bottom',width+2+"px")
    $(".choose-avatar").css('background-size',"contain")
    // style="background-image: url({{dataImage.url}})"
  }
}
