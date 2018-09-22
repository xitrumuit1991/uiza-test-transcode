import {Component, ViewChild, TemplateRef, Input, OnInit, AfterViewInit} from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-uiza-modal-popup',
  styleUrls: ['./modal-popup.component.scss'],
  templateUrl: './modal-popup.component.html',
})
export class UizaModalPopupComponent implements OnInit, AfterViewInit{
  bsModalRef: BsModalRef;
  @ViewChild('templateModal') templateModal: TemplateRef<any>;
  @Input() modalObject:any={
    showBtnDemo : true,
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

  showModal(){
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

  constructor(private modalService: BsModalService){

  }

  ngOnInit(){
    if(this.modalObject){
      this.modalObject.show = ()=>{
        this.bsModalRef = this.modalService.show(this.templateModal, { backdrop: true, ignoreBackdropClick: true, class: this.modalObject.class});
      };
      this.modalObject.hide = ()=>{
        this.bsModalRef.hide();
      };
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
}
