import {Component, ViewChild, TemplateRef, Input, OnInit, AfterViewInit, ElementRef, EventEmitter, Output} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import {ApiService} from '../../../@service';
import {Router, ActivatedRoute} from '@angular/router';
import _ from 'lodash';

@Component({
  selector: 'app-uiza-move-popup',
  templateUrl: './move-popup.component.html',
  styleUrls: ['./move-popup.component.scss']
})
export class UizaMovePopupComponent implements OnInit, AfterViewInit {
  bsModalRef: BsModalRef;
  @ViewChild('checkboxScroll') checkboxScroll: ElementRef;
  pageFolderPlaylist: any = 1;
  loadingScroll: any = false;
  @ViewChild('templateModal') templateModal: TemplateRef<any>;
  @Output() uizaModelChange = new EventEmitter();
  @Output() listItemChange = new EventEmitter();
  @Input() uizaModel = [];
  @Input() options: any;
  @Input() modalObject:any={
    // showBtnDemo : true,
    class : 'custom-modal-class',
    title : 'Modal title',
    message: 'Modal message',
    textCancel : 'Cancel',
    textConfirm : 'Submit',
    contentFloatLeft: false,
    hideFooter: false,
    confirm:()=>{
      console.log('click confirm');
    },
    cancel:()=>{
      console.log('click cancel');
      this.bsModalRef.hide();
    },
    show:()=>{
      this.bsModalRef = this.modalService.show(this.templateModal, { backdrop: true, ignoreBackdropClick: true, class: this.modalObject.class});
    },
    hide:()=>{
      this.bsModalRef.hide();
    },
    buttons : [
      {title:'More button', class:'btn btn-danger', action : ()=>{ console.log('click more btn');}}
    ]
  };

  settings: any = {
    paging: {
      total: 0,
      page: 1,
      limit: 5,
      onChange: (page) => {
        this._router.navigate(['.'], {
            relativeTo: this.activateRoute,
            queryParams: {page: page.page, limit: page.limit}
          }
        );
        this.initData(page);
      }
    }
  };
  settingModal = {
    col: 6,
    title: 'Mulit Checkbox',
    key: 'multiCheckbox',
    type: 'multiCheckbox',
    description: 'Please choose new place to file',
    settings: {
      titleKey: 'title',//Default is title optional
      valueKey: 'value',//Default is value optional
      values: []
    }
  };
  currentValue: any;

  // TODO: prepare for multi language
  public language: any = {
    captureVideoButtonSave: `Save`,
    captureVideoButtonCancel: `Cancel`
  };


  showModal(){
    console.log('showModal');
    this.bsModalRef = this.modalService.show(this.templateModal, { backdrop: true, ignoreBackdropClick: true, class: this.modalObject.class});
    if (typeof this.modalObject.show === 'function') {
      // this.modalObject.show();
    }
  }

  hideModal(){
    this.bsModalRef.hide();
    if (typeof this.modalObject.hide === 'function') {
      // this.modalObject.hide();
    }
  }

  constructor(private _apiService: ApiService,
    private _router: Router,
    private activateRoute: ActivatedRoute,
    private modalService: BsModalService,){

  }


  ngOnInit(){
    console.log('options',this.options);
    if(this.modalObject){
      this.modalObject.show = ()=>{
        this.bsModalRef = this.modalService.show(this.templateModal, { backdrop: true, ignoreBackdropClick: true, class: this.modalObject.class});
      };
      this.modalObject.hide = ()=>{
        this.bsModalRef.hide();
      };
      this.initData();
    }
  }

  ngAfterViewInit(){
    if(this.modalObject){
      this.modalObject.show = ()=>{
        this.bsModalRef = this.modalService.show(this.templateModal, { backdrop: true, ignoreBackdropClick: true, class: this.modalObject.class});
      };
      this.modalObject.hide = ()=>{
        this.bsModalRef.hide();
      };
    }
  }

  onScroll(){
    if(this.checkboxScroll.nativeElement.scrollTop > this.checkboxScroll.nativeElement.scrollHeight - 200 && !this.loadingScroll){
      this.loadingScroll = true;
      this.pageFolderPlaylist = this.pageFolderPlaylist + 1;
      let paramGet = {
        type: 'folder',
        page: this.pageFolderPlaylist
      };
      if(this.options.option === 'playlist'){
        paramGet.type = 'playlist';
      }
      this._apiService.api.mediaMetaData.get(paramGet).then((resultFolder)=> {
        this.loadingScroll = false;
        if (resultFolder && resultFolder.data) {
          _.each(resultFolder.data, (value)=> {
            let item = {
              title: (value.name && value.name.length) > 30 ? (value.name.substring(0, 30) + '...') : (value.name.lastIndexOf('.') > -1 ? value.name.substring(0, value.name.lastIndexOf('.')) : value.name),
              value: value.id,
              icon: this.options.option === 'folder'?'icon-folder-1':'icon-playlist'
            };
            this.settingModal.settings.values.push(item);
          });
        }
      }).catch(error => {
        this.loadingScroll = false;
        console.error(error);
      });
    }
  }

  initData(page = null) {
    this.getEntityMetadata();
    let paramGet = {
      // limit: this.settings.paging.limit > 20 ? 20 : this.settings.paging.limit,
      // page: page ? page.page : this.settings.paging.page,
      type: 'folder',
    };
    if(this.options.option === 'playlist'){
      paramGet.type = 'playlist';
    }

    this._apiService.api.mediaMetaData.get(paramGet).then((resultFolder)=> {
      if (resultFolder && resultFolder.data) {
        _.each(resultFolder.data, (value)=> {
          let item = {
            title: value.name.length > 30 ? (value.name.substring(0, 30) + '...') : value.name.lastIndexOf('.') > -1 ? value.name.substring(0, value.name.lastIndexOf('.')) : value.name,
            value: value.id,
            icon: this.options.option === 'folder'?'icon-folder-1':'icon-playlist'
          };
          this.settingModal.settings.values.push(item);
        });
        if(resultFolder.metadata)
          this.settings.paging.total = resultFolder.metadata.total;
      }
    }).catch(error => {
      console.error( error);
    });

  }

  onCancel(){
  }
  // public onSave() {
  //
  //
  //   this.getAllItem();
  //
  //   console.log('this.listItem',this.listItem);
  //   this.uizaModelChange.emit(this.listItem);
  // }


  setCurrentSelect(){
    // console.log(item);
    // item.selected = !item.selected;
    // item.color = item.color === 'none'? '#047bf8':'none';
    // console.log(this.uizaModel);
    this.uizaModelChange.emit(this.uizaModel);
  }
  // getAllItem(){
  //   this.uizaModel = this.uizaModel.filter((item) => {
  //       return item.selected === true;
  //   });

  // }

  getEntityMetadata = async () => {
    if(this.options.id && this.options.id.length === 1){
      const resultEnittyMetadata = await this._apiService.api.mediaMetaData.get({ entityId: this.options.id });
    this.currentValue = [];
    let metadataFolder = [];
    let metadataPlaylist = [];
    _.each(resultEnittyMetadata.data, (item) => {
      item && item.type === "folder" ? metadataFolder.push(item.id) : metadataPlaylist.push(item.id);
    });

    this.currentValue = this.options.option === 'folder'?metadataFolder:metadataPlaylist;
    this.uizaModel = this.currentValue;
    this.uizaModelChange.emit(this.uizaModel);
    }
  }


}
