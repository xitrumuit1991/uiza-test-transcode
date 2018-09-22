import {
  Component, ContentChild, ElementRef, AfterContentInit, Input, Output, EventEmitter,
  QueryList, ViewChildren
} from '@angular/core';
import * as _ from 'lodash';
import {__listOfFunction} from 'aws-sdk/clients/greengrass';
import {ApiService} from "../../../@service";
import {UizaModalPopupComponent} from "../modal-popup/modal-popup.component";
@Component({
  selector: 'app-uiza-entity-publish-packager',
  styleUrls: ['./entity-publish-packager.component.scss'],
  templateUrl: './entity-publish-packager.component.html',
})

export class UizaEntityPublishPackagerComponent implements AfterContentInit {

  @Input() settings : any = {
    submit : ()=>{
      let dataOut:any={};
      dataOut.chooseOptions=(this.chooseOptions);
      dataOut.desPublish=(this.desPublish);
      dataOut.selectedExtend=(this.selectedExtend);
      this.dataCheck.emit(dataOut);
      console.log('click submit');
    }
  };
  @Input() data: any = {};
  @Output() dataCheck = new EventEmitter();
  test:any=[{id:'1',name:'1'},{id:'2',name:'2'}]
  // @Input() complete={
  //   complete:()=>{}
  // }
  // Complete(){
  //   let dataOut=[];
  //   dataOut.push(this.chooseOptions);
  //   dataOut.push(this.desPublish);
  //   this.dataCheck.emit(dataOut);
  //   // this.complete.complete()
  // }
  @ViewChildren(UizaModalPopupComponent) uizaModalPopupComponents: QueryList<UizaModalPopupComponent>;
  extendMetadataModal: UizaModalPopupComponent;
  selectAllModel:any = false;
  useExtendData: any = false;
  desPublish = [
    {
      title :'Mobile (HLS/DASH)',
      icon : '../../../../assets/img/main_ico_mobile.png',
      isActive : false,
      onChange:(value, data)=>{
        data.isActive = value;
        console.log('click', value, data);
      }
    },
    {
      title :'Website (HLS/DASH)',
      icon : '../../../../assets/img/main_ico_website.png',
      isActive : false,
      onChange:(value, data)=>{
        data.isActive = value;
        console.log('click', value, data);
      }
    },
    {
      title :'Smarttv (MSS)',
      icon : '../../../../assets/img/main_ico_tv.png',
      isActive : false,
      onChange:(value, data)=>{
        data.isActive = value;
        console.log('click', value, data);
      }
    }
  ];

  chooseOptions = [
    {
      title:'Extend Metadata',
      // subtitle : 'Choose if you want to set up Metadata to your Content or not',
      settings : {
        titleKey: 'title',
        valueKey: 'value',
        name : 'extenddata',
        block : true,
        values: [
          { title: "Don't use Extend Data", value: 'no' },
          { title: "Use Extend Data", value: 'yes' }
        ],
        onChange: (data)=>{
          this.useExtendData = data;
        }
      }
    }
  ]

  extendList: any = [];
  selectedExtend: any;
  popUpAddExtendComponent: any = {
    id: 'extendMetadata-form',
    showBtnDemo: false,
    class: 'modal-lg',
    title: 'Create Extend Metadata',
    // message: '',
    textCancel: 'Cancel',
    textConfirm: 'OK',
    hideFooter: true,
    buttons: [],
    confirm: (data) => {
    },
    cancel: () => {
      this.extendMetadataModal.hideModal()
    },
    show: () => {
      // this.bsModalRef = this.modalService.show(this.extendMetadataModal, { backdrop: true, ignoreBackdropClick: true });
    },
    hide: () => {

    },
  };
  constructor(private apiService: ApiService) {
    this.getMetadataSetting();
  }

  getMetadataSetting = async () => {
    const extendMetadataResponse = await this.apiService.api.mediaExtendData.get()
    this.extendList = extendMetadataResponse.data
    console.log("exteandMetadata ", this.extendList)
    // if(setDefault) {
    //   this.selectedExtend = this.extendList && this.extendList[0];
    // }
  }

  showAddExtendModal() {
    this.extendMetadataModal.showModal();
  }
  cancelExtend() {
    this.extendMetadataModal.hideModal();
  }

  submitExtend(extendId) {
    this.extendMetadataModal.hideModal();
    this.getMetadataSetting();

  }

  clickSelectAll(value){
    this.selectAllModel = value;
    _.map(this.desPublish, (item)=>{item.isActive = this.selectAllModel});
  }

  ngAfterContentInit()  {

  }
  ngAfterViewInit(){
    console.log("uizaModalPopupComponents", this.uizaModalPopupComponents.length);
    this.uizaModalPopupComponents.forEach(item => {
      if (item.modalObject.id == "extendMetadata-form") {
        this.extendMetadataModal = item;
      }
    })
  }

}
