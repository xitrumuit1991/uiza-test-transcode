import { Component, ContentChild, ElementRef, AfterContentInit, Input, EventEmitter, Output } from '@angular/core';
import _ from 'lodash';
import { ENGINE_METHOD_DIGESTS } from 'constants';
import {ApiService, UtilService} from '../../../@service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-uiza-smart-form',
  styleUrls: ['./smart-form.component.scss'],
  templateUrl: './smart-form.component.html',


})

export class UizaSmartFromComponent {
  constructor(private apiService: ApiService,
              private router: Router,
              private utilService: UtilService,
              private activateRoute: ActivatedRoute){
  }
  @Input() source: object = {
    select: 'developer',
    name: 'Uiza',
    multiCheckbox: ['actiontwo'],
    multiRadio: 1,
    multiRadio2: 2,
    checkbox: true,
    toggleSwitch: 1,
    thumbnail: '',
  }

  @Input() required:any = [];
  @Input() settings: any = {
    viewEnable: false,
    editDisable: false,
    viewMode: true,
    viewText: 'Edit Content',
    viewTextCancel: 'Cancel Edit',
    submitDisable: false,
    uniqueEdit: false,
    strongKey: false,
    beforeSubmit:()=>{},
    buttons: [{
      title: 'Test connection',
      class: 'btn btn-secondary btn-sm',
      action: () => {
        console.log('test connection');
      }
    }],
    hiddenField: {
      streamUrl: true
    }
  };
  @Output() sourceChange = new EventEmitter();
  @Input() inputs: any = [
    {
      title: 'Event information',
      col: 6,
      body: [{
        col: 6,
        title: 'Icon Button',
        type: 'text',
        key: 'iconButton',
        placeholder: 'Name',
        icon: '<i class="icon icon-url"></i>',
        iconClass: 'bg-primary',
        iconAfter: false,
        iconFunction: () => {
          console.log('iconFunction')
        }
      }, {
        col: 6,
        title: 'Name',
        type: 'text',
        key: 'name',
        placeholder: 'Name',
        disable: true,
        require: true,
      }, {
        col: 6,
        title: 'Password',
        type: 'password',
        key: 'password',
        placeholder: 'Password',
        require: true
      }, {
        col: 12,
        title: 'Select',
        type: 'select',
        key: 'select',
        placeholder: 'Select',
        titleKey: 'title',
        valueKey: 'value',
        values: [{ title: 'Uiza', value: 'uiza' }, { title: 'Developer', value: 'developer' }]
      }, {
        col: 12,
        rows: 5,
        title: 'Description',
        type: 'textarea',
        key: 'description',
        placeholder: 'Description'

      }, {
        col: 12,
        title: 'Event Thumbnail',
        type: 'groupInput',
        key: 'eventUlr',
        icon: 'Copy link',
        iconClass: 'bg-primary',
        iconAfter: true,
      }, {
        col: 12,
        title: 'Event Thumbnail',
        type: 'imageUpload',
        config: {
          title: 'Upload Thumbnail',
          showProgressBar: true,
          complete: (data) => {
            this.source['thumbnail'] = data;
          },
        }
      }]
    }, {
      title: 'Advanced Setting',
      col: 6,
      body: [{
        col: 6,
        title: 'Mulit Checkbox',
        key: 'multiCheckbox',
        type: 'multiCheckbox',
        description: 'If you choose yes, we will delicate a separate resource for you and charge with the price for Delicate Resource',
        settings: {
          titleKey: 'title',//Default is title optional
          valueKey: 'value',//Default is value optional
          values: [
            { title: 'Broadcaster', value: 'bradcaster' },
            { title: 'Nestcaster', value: 'nestcaster' },
            { title: 'Actiontwo', value: 'actiontwo' }
          ]
        }
      }, {
        col: 6,
        title: 'Checkbox',
        key: 'checkbox',
        type: 'checkbox',
        valuePrepareFunction: (data) => {
          if (!data) {
            return '<span class="badge badge-pill badge-danger">Unactive</span>'
          }
          return '<span class="badge badge-pill badge-success">Active</span>'
        }
      }, {
        col: 6,
        title: 'Toggle Switch',
        key: 'toggleSwitch',
        type: 'toggleSwitch'
      }, {
        col: 6,
        title: 'Mulit Radio',
        key: 'multiRadio',
        type: 'multiRadio',
        settings: {
          values: [
            { title: 'Yes', value: 1 },
            { title: 'No', value: 0 }
          ]
        }
      }, {
        col: 6,
        title: 'Mulit Radio 2',
        key: 'multiRadio2',
        type: 'multiRadio',
        onChange: (data) => {
          if (this.settings && this.settings.hiddenField) {
            if (data) {
              return this.settings.hiddenField.streamUrl = true
            }
            this.settings.hiddenField.streamUrl = false
          }

        },
        settings: {
          values: [
            { title: 'Yes', value: 1 },
            { title: 'No', value: 0 }
          ]
        }
      }, {
        col: 6,
        title: 'Stream url',
        key: 'streamUrl',
        type: 'text'
      }, {
        col: 6,
        title: 'Dropdown select',
        key: 'dropdownSelect',
        type: 'dropdownSelect',
        onChange: (data) => {
          console.log('dropndownSelect change');

        },
        settings: {
          items: [],
          bindLabel: 'name',
          placeholder: 'Select Playlist',
          notFoundText: "You don't have playlist..",
          ngModel: {},

          values: [
            {
              "id": "fa0f91e0-2173-4663-80fa-5f32c6a61150",
              "name": "23456",
              "description": "",
              "slug": "23456",
              "type": "playlist",
              "orderNumber": 0,
              "icon": "",
              "status": 1,
              "createdAt": "2018-07-25T03:17:11.000Z",
              "updatedAt": "2018-07-25T03:17:11.000Z"
            },
            {
              "id": "a399f852-c9ec-4960-89e6-de8efa507c19",
              "name": "1234",
              "description": "",
              "slug": "1234",
              "type": "playlist",
              "orderNumber": 0,
              "icon": "",
              "status": 1,
              "createdAt": "2018-07-25T03:16:53.000Z",
              "updatedAt": "2018-07-25T03:16:53.000Z"
            },
            {
              "id": "63ed8ce6-9800-4ef0-8497-c097ab2a0d79",
              "name": "Playlist",
              "description": null,
              "slug": "playlist",
              "type": "playlist",
              "orderNumber": 2,
              "icon": "",
              "status": 1,
              "createdAt": "2018-07-20T07:45:54.000Z",
              "updatedAt": "2018-07-20T07:45:54.000Z"
            }
          ]
        }
      }]
    }
  ]

  uploadImageDone() {
    console.log('upload done');
  }

  checkValid = (key) => {

    let check = _.indexOf(this.required, key)
    if (check !== -1) {
      return 'is-invalid'
    }
  }
  @Input() onChangeMode = () => {
    this.settings.viewMode = !this.settings.viewMode
  }

  onSubmit = () => {
    if(this.settings.beforeSubmit && typeof this.settings.beforeSubmit == "function")
    {
      var value=this.settings.beforeSubmit()
      if(value=='return') return
    }
    // if(value) return
    let dataRequire = []
    let validate = _.flatten(_.map(this.inputs, 'body'));
    _.map(validate, (item) => {
      if (!item.require || !item.key) {
        return
      }
      if (!this.source[item.key]) {
        dataRequire.push(item.key)
      }

    });
    this.required = dataRequire;
    if (this.required.length === 0) {
      console.log(this.source);
      this.sourceChange.emit(this.source);
    }
    // console.log(this.required)
    if(_.isArray(this.required) && this.required.length>0) {this.utilService.notifyError('Please,fill the required fields')}
  }

  dataToString = (items) =>{
    let dataString = '';
    _.each(items, (item) => {
      dataString+=item.name + ', ';
    });
    return dataString;
  }

}
