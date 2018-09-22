import { Component, OnInit, ViewChild, ElementRef, Input, AfterViewInit } from '@angular/core';
// import * as $ from 'jquery';
import * as _ from 'lodash';
import {UtilService} from "../../../@service/index";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-uiza-tree-view',
  styleUrls: ['./tree-view.component.scss'],
  templateUrl: './tree-view.component.html',
})


export class UizaTreeViewComponent implements OnInit, AfterViewInit  {
  @ViewChild('tree') public tree: ElementRef;
  @Input() showError:any = false;
  @Input() storageInfo: any = {
    type: 'ftp',
    region: "ap-southeast-1",
    host: "dev-ftp.uiza.io",
    port: 21,
    user: "uiza",
    password: "1qaz2wsx",
    bucket : ''
  };
  @Input() apiRequest: any = {
    url: `${window.location.protocol}//${environment.apiUrl}/api/private/v3/media/storage/ftp`,
    method: 'POST',
    contentType : 'application/json',
    headers: {
      Authorization: window.localStorage['uiza_token'],
      "Content-Type":'application/json'
    }
  };
  options = {
    checkbox: {
      keep_selected_style: false
    },
    core: {
      animation: 300,
      data: {
        url: this.apiRequest.url,
        method: this.apiRequest.method,
        headers: this.apiRequest.headers,
        contentType : 'application/json',
        dataType:'json',
        data: (node) => {
          return this.getParamNode(node);
        }
      },
      error: (error) => {
        let err;
        console.log('js tree error', error);
        try {
          err = JSON.parse(error.data).xhr.responseJSON;
          if(err && this.utilService && this.showError)
            this.utilService.notifyError(err.message);
          return console.error(err);
        } catch (_error) {
          console.log('JSON.parse; js tree _error', _error);
          return console.error(_error);
        }
      }
    },
    types: {
      '#': {
        valid_children: ['root']
      },
      root: {
        icon: 'icon icon-home'
      },
      "default": {
        icon: 'icon icon-folder',
        valid_children: ['default']
      },
      file: {
        icon: 'icon icon-copy'
      },
      bucket: {
        icon: 'fa fa-bitbucket'
      }
    },
    plugins: ["sort", "checkbox", "types"]
  };
  treeEl: any = null;
  rootPath = '/';

  constructor(private utilService: UtilService){

  }

  getOptions = () => {
    this.options.core.data.url = this.apiRequest.url;
    this.options.core.data.method = this.apiRequest.method;
    this.options.core.data.headers = this.apiRequest.headers;
    this.options.core.data.contentType = this.apiRequest.contentType;
    return this.options;
  }

  getParamNode = (node) => {
    let path;
    let ref = node.original;
    let ref1 = node.original;
    if (node.id === '#') {
      path = this.rootPath;
    } else {
      path = ref != null ? ref.path : null;
    }
    let params = {
      path: path,
      account: {
        host: this.storageInfo.host,
        port: this.storageInfo.port,
        user: this.storageInfo.user,
        password: this.storageInfo.password,
        type: this.storageInfo.type,
        awsAccessKey: this.storageInfo.awsAccessKey,
        awsSecretKey: this.storageInfo.awsSecretKey,
        region: this.storageInfo.region,
        bucket: (ref1 != null ? ref1.bucket : null) || (this.rootPath === '/' ? null : this.rootPath)
      }
    };
    return JSON.stringify(params);
  }

  renderTreeView = () => {
    console.log(this.storageInfo);
    if(this.storageInfo.type === 's3' || this.storageInfo.type === 's3-compatible'){
      if(!this.storageInfo.bucket)
        return this.utilService.notifyError('Missing bucket to list file');
      this.rootPath = this.storageInfo.bucket;
    }
    else{
      this.rootPath = '/';
    }
    this.treeEl = $(this.tree.nativeElement);
    $(this.tree.nativeElement)['jstree'](this.getOptions());
    $(this.tree.nativeElement)['jstree'](true).refresh();
    console.log('render tree');
  }

  clearTreeView = () => {
    $(this.tree.nativeElement)['jstree']('destroy').empty(); 
  }

  getNodeSelected(cb){
    let data = $(this.tree.nativeElement)['jstree']("get_checked", true);
    console.log('getNodeSelected', data);
    let items = _.map(data, 'original');
    _.map(items, (item)=>{
      item.name = item.text;
      item.inputType = this.getStorageType(this.storageInfo);
      item.typeFile = this.storageInfo.type;
    });
    if(typeof cb === 'function')
      return cb(items);
  }

  getStorageType(storageInfo){
    if(storageInfo.type === 's3-compatible'){
      return 's3';
    }
    return storageInfo.type;
  }

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    // if(this.storageInfo.type === 's3'){
    //   if(!this.storageInfo.bucket)
    //     return this.utilService.notifyError('Missing bucket to list file');
    //   this.rootPath = this.storageInfo.bucket;
    // }
    // else{
    //   this.rootPath = '/';
    // }
    // this.treeEl = $(this.tree.nativeElement);
    // this.renderTreeView();
  }
}
