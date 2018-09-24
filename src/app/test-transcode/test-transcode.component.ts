import {Component, OnInit, ViewChild, Input, TemplateRef} from '@angular/core';
import * as XLSX from 'ts-xlsx';
import * as _ from 'lodash';
import {ApiService, UtilService, UserService} from "../@service/index";
import {Router} from "@angular/router";
import {BsModalService} from 'ngx-bootstrap/modal';
import {BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service';

declare let videojs: any;

@Component({
  selector: 'app-uiza-test-transcode',
  templateUrl: './test-transcode.component.html',
})

export class UizaTestTranscodeComponent implements OnInit {

  file: any;
  arrayBuffer: any;
  data: any = [];
  setting: any = {
    token: '0268cb938c85896ff15910dec6bd512bb7a90147cf0ed5a1252316cb742758cceb7c07f63e9e1ca25f11e38462e08f15dffed82c4501de9c378f5686aeee944c',
    domain: 'https://azui01-api.uiza.co/',
    env: 'staging',
    app_id: '4b225efbe2fc4cc7826327fbb21aaab5'
  };
  idInterval: any;
  playerOptions: any = {
    ratio: '16:9',
    streamType: 'url',
    url: 'https://vm2.dashif.org/livesim/testpic_2s/Manifest.mpd'
  };

  bsModalRef: BsModalRef;
  @ViewChild('templateModal') templateModal: TemplateRef<any>;
  modalObject = {
    title: 'Player testing',
    message: 'Player testing',
    class: 'modal-lg-social',
    confirm: () => {
    },
    cancel: () => {
      // this.initData();
      this.bsModalRef.hide();
    },
    show: () => {
      // clearInterval(this.intervalIds);
      this.bsModalRef = this.modalService.show(this.templateModal, {backdrop: true, ignoreBackdropClick: true, class: 'modal-lg-social'});
    },
    hide: () => {
      // this.initData();
      this.bsModalRef.hide();
    }
  };

  @Input() source: object = [
    {
      "id": "110ea40a-58bd-45a3-ba1e-c3f0c0cef9c2",
      "name": "https://www.youtube.com/watch?v=tB4JLFz28Ts",
      "description": null,
      "shortDescription": null,
      "inputType": "http",
      "url": "https://www.youtube.com/watch?v=tB4JLFz28Ts",
      "masterTaskId": "4e93fc9e-6b82-4f06-a816-e14b030288a1",
      "masterProgress": "success",
      "standardTaskId": "416a67b8-e479-48b4-84a0-cfaf493f2f07",
      "standardProgress": "success",
      "view": 0,
      "poster": "http://azui01-static.uizacdn.net/4b225efbe2fc4cc7826327fbb21aaab5-static/2018/09/22/110ea40a-58bd-45a3-ba1e-c3f0c0cef9c2/thumbnail-10-8-720.jpeg",
      "thumbnail": "http://azui01-static.uizacdn.net/4b225efbe2fc4cc7826327fbb21aaab5-static/2018/09/22/110ea40a-58bd-45a3-ba1e-c3f0c0cef9c2/thumbnail-10-8-720.jpeg",
      "type": "vod",
      "status": 2,
      "duration": "483.392000",
      "readyToPublish": "on",
      "embedMetadata": null,
      "extendMetadataId": null,
      "publishToCdn": "success",
      "extendMetadata": null,
      "createdAt": "2018-09-22T12:21:09.000Z",
      "updatedAt": "2018-09-22T12:21:09.000Z",
      "publishStatus": {progress: 100, status: "success"},
      "linkplay": {
        "urls": [
          {
            "url": "http://azui01-vod.uizacdn.net/4b225efbe2fc4cc7826327fbb21aaab5-stream/110ea40a-58bd-45a3-ba1e-c3f0c0cef9c2/package/playlist.m3u8",
            "support": "hls",
            "codec": [
              "h264",
              "h265"
            ],
            "type": "stream",
            "region": "ap-southeast-1",
            "priority": 1
          },
          {
            "url": "http://azui01-vod.uizacdn.net/4b225efbe2fc4cc7826327fbb21aaab5-stream/110ea40a-58bd-45a3-ba1e-c3f0c0cef9c2/package/manifest.mpd",
            "support": "mpd",
            "codec": [
              "h264",
              "h265"
            ],
            "type": "stream",
            "region": "ap-southeast-1",
            "priority": 1
          }
        ]
      }
    }
  ];
  @Input() settings: any = {
    emptyContent: null,
    display: {
      rowNumber: true,
      paging: true,
      actions: true,
      select: true
    },
    limits: [5, 10, 15, 20, 50],
    paging: {
      total: 0,
      page: 1,
      limit: 5,
      onChange: (data) => {
        // this.initData();
        console.log(data);
      }
    },
    actions: {
      delete: true,
      edit: true,
    },
    editIcon: '',
    editFunction: (data) => {
      console.log('Edit :', data);
      // this.router.navigate(['admin/ucc/customer-origin/action/'+data.id]);
    },
    deleteIcon: '',
    deleteFunction: async (item) => {
      console.log('Delete :', item);
    },
    selectFunction: (data, value) => {
      // console.log('Select', data);
      // console.log('value1 ', value);
      // value.isSelected = data;
      // console.log('value2 ', value);
    },
    defaultHeaderClass: 'text-left',
    columns: {
      id: {title: 'id', type: 'string',},
      name: {title: 'name', type: 'string',},
      url: {title: 'url', type: 'string',},
      thumbnail: {
        title: 'thumbnail',
        type: 'custom',
        valuePrepareFunction: (data) => {
          if (data)
            return `<img src="${data}" width='auto' height='100'/> <br> <span>${data}</span>`;
          return `<img src="../../../../assets/img/image-not-available.jpg" width='auto' height='100'/><br><span>${data}</span>`;
        }
      },
      type: {title: 'type', type: 'string',},
      inputType: {title: 'inputType', type: 'string'},
      masterTaskId: {title: 'masterTaskId', type: 'string'},
      standardTaskId: {title: 'standardTaskId', type: 'string'},
      masterProgress: {title: 'masterProgress', type: 'string'},
      standardProgress: {title: 'standardProgress', type: 'string'},
      duration: {title: 'duration', type: 'string'},
      status: {
        title: 'status',
        type: 'custom',
        valuePrepareFunction: (data) => {
          let badge = [
            {color: 'danger', title: '0 - Inactive'},  //0
            {color: 'success', title: '1 - Active'},    //1
            {color: 'success', title: '2 - Active'},    //2
            {color: 'success', title: '3 - Active'},    //3
          ];
          return `<span class="badge badge-pill badge-${badge[data].color}">${badge[data].title}</span>`;
        }
      },
      publishStatus: {
        title: 'publishStatus',
        type: 'custom',
        valuePrepareFunction: (value, index, data) => {
          // console.log('publishStatus', value);
          // console.log('index', index);
          return `<span>${JSON.stringify(value)}</span>`;
        }
      },
      readyToPublish: {title: 'readyToPublish', type: 'string'},
      publishToCdn: {title: 'publishToCdn', type: 'string'},
      player: {
        title: 'Player',
        type: 'player',
        click: ($event, data, key) => {
          console.log('player', data);
          // console.log('data.linkplay', data.linkplay);
          // console.log('data.linkplay.urls', data.linkplay.urls);
          if (data && data.linkplay && data.linkplay.urls && data.linkplay.urls[0]) {
            this.playerOptions.url = data.linkplay.urls[0].url;
          }
          this.modalObject.show();
          // let player = videojs('my_video_1');
          // setTimeout(()=>{
          //   let player = videojs('my_video_1');
          // },2000);
        }
      }
    },
  };

  async onDeleteItem(data) {
    if (data && data.id) {
      try {
        // await this.apiService.api.ucc.customerOrigin.delete(data);
        this.utilService.notify('Delete Status', 'Delete success', 'success');
        // this.initData();
      } catch (e) {
        this.utilService.notifyError(e.message);
        console.error(e);
      }
    }
  }

  onInputFileChange(event) {
    this.file = event.target.files[0];
    console.log('file select', this.file);
  }

  uploadExcelFile() {
    let fileReader = new FileReader();
    console.log(' authToken', this.setting.token);
    console.log(' file', this.file);
    if (_.isEmpty(this.setting.token) || _.isEmpty(this.setting.domain) || _.isEmpty(this.setting.env)) {
      return this.utilService.notifyError('Empty token; domain; env');
    }
    if (!_.includes(['staging', 'production'], this.setting.env)) {
      return this.utilService.notifyError('Only support staging or production');
    }
    if (!this.file) return this.utilService.notifyError('select file');
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      if (this.arrayBuffer) {
        let data = new Uint8Array(this.arrayBuffer);
        let arr = new Array();
        for (let i = 0; i !== data.length; ++i)
          arr[i] = String.fromCharCode(data[i]);
        let bstr = arr.join("");
        let workbook = XLSX.read(bstr, {type: "binary"});
        let first_sheet_name = workbook.SheetNames[0];
        let worksheet = workbook.Sheets[first_sheet_name];
        this.data = XLSX.utils.sheet_to_json(worksheet, {raw: true});
        console.log(this.data);
        this.utilService.notifySuccess(`Import ${this.data.length} item success`);
        this.startProcess();
      }
    };
    fileReader.readAsArrayBuffer(this.file);
  }

  ngOnInit() {

  }

  constructor(private apiService: ApiService,
              private router: Router,
              private utilService: UtilService,
              private userService: UserService,
              private modalService: BsModalService,) {
  }

  getExtFile(filename) {
    if (!filename)
      return '.mp4';
    return '.' + filename.split('.').pop();
  }

  createEntity(dataExcel) {
    if (!dataExcel)
      return console.error('empty dataexcel', dataExcel);
    let tmpFile = {
      "name": dataExcel.name.trim() || dataExcel.title.trim() || dataExcel.url.trim(),
      "url": dataExcel.url,
      "inputType": "http",
      "type": "vod",
    };
    console.log('tmpFile', tmpFile);
    let token = this.setting.token;
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        beforeSend: function (request) {
          request.setRequestHeader("Authorization", token);
        },
        url: this.setting.domain + "api/private/v3/media/entity",
        data: tmpFile,
        success: (data) => {
          console.log('createEntity', data);
          if (data && data.data)
            return resolve(_.extend(dataExcel, data.data));
          return resolve(data);
        },
        error: (data) => {
          return reject(data);
        }
      });
    });
  }

  updateEntity(item) {
    let token = this.setting.token;
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "PUT",
        beforeSend: function (request) {
          request.setRequestHeader("Authorization", token);
        },
        url: this.setting.domain + "api/private/v3/media/entity",
        data: {
          id: item.id,
          status: 1,
          view: 0,
          "uploadDetail": null
        },
        success: function (data) {
          // console.log('update entity',data);
          if (data && data.data)
            return resolve(_.extend(item, data.data));
          return resolve(data);
        },
        error: function (data) {
          return reject(data);
        }
      });
    });
  }

  getEntity(item) {
    let token = this.setting.token;
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "GET",
        beforeSend: function (request) {
          request.setRequestHeader("Authorization", token);
        },
        url: this.setting.domain + "api/private/v3/media/entity?id=" + item.id,
        success: function (data) {
          // console.log('get entity',data);
          if (data && data.data)
            return resolve(_.extend(item, data.data));
          return resolve(data);
        },
        error: function (data) {
          return reject(data);
        }
      });
    });
  }

  publishCdn(item) {
    let token = this.setting.token;
    return new Promise((resolve, reject) => {
      $.ajax({
        type: "POST",
        data: {
          id: item.id,
        },
        beforeSend: function (request) {
          request.setRequestHeader("Authorization", token);
        },
        url: this.setting.domain + "api/private/v3/media/entity/publish",
        success: function (data) {
          if (data && data.data)
            return resolve(_.extend(item, data.data));
          return resolve(data);
        },
        error: function (data) {
          return reject(data);
        }
      });
    });
  }

  getStatusPublish(item) {
    let token = this.setting.token;
    return new Promise((resolve, reject) => {
      if (item && item.publishStatus && (item.publishStatus.progress === 100 || item.publishStatus.status === 'success' ))
        return reject('item publish success');
      $.ajax({
        type: "GET",
        beforeSend: function (request) {
          request.setRequestHeader("Authorization", token);
        },
        url: this.setting.domain + "api/private/v3/media/entity/publish/status?id=" + item.id,
        success: function (data) {
          if (data && data.data)
            return resolve(_.extend(item, {publishStatus: data.data}));
          return resolve(data);
        },
        error: function (data) {
          return reject(data);
        }
      });
    });
  }

  getLinkPlay(item) {
    let token = this.setting.token;
    if (item && (!item.publishStatus || item.publishStatus.progress !== 100 || item.publishStatus.status !== 'success' )) {
      return 'Item not publish cdn success';
    }
    return new Promise((resolve, reject) => {
      if (item && item.publishStatus && (item.publishStatus.progress === 100 && item.publishStatus.status === 'success' )) {
        $.ajax({
          type: "GET",
          beforeSend: function (request) {
            request.setRequestHeader("Authorization", token);
          },
          url: `${this.setting.env === "staging" ? "https://stag-ucc.uiza.io/" : "https://ucc.uiza.io/" }api/private/v1/cdn/linkplay?entity_id=${item.id}&app_id=${this.setting.app_id}&type_content=stream`,
          success: function (data) {
            if (data && data.data)
              return resolve(_.extend(item, {linkplay: data.data}));
            return resolve(data);
          },
          error: function (data) {
            return reject(data);
          }
        });
      } else {
        return reject('Item not publish cdn success');
      }
    });
  }

  startIntervalGetStatus() {
    if (this.idInterval) clearInterval(this.idInterval);
    this.idInterval = setInterval(async () => {
      console.log('start interval');
      for (let i = 0; i < this.data.length; i++) {
        let oneData = this.data[i];
        if (oneData && oneData.id) {
          //get entity detail
          try {
            this.data[i] = await this.getEntity(oneData);
          } catch (error) {
            console.error('getEntity', error);
            throw error;
          }
        }

        oneData = this.data[i];
        if (oneData && oneData.id && (!oneData.publishStatus || (oneData.publishStatus && !_.includes(['error', 'success'], oneData.publishStatus.status)) )) {
          //get status publish cdn
          try {
            this.data[i] = await this.getStatusPublish(oneData);
          } catch (error) {
            console.error(error);
          }
        }
      }
    }, 5000);
  }

  viewPlayer(data) {
    console.log('viewPlayer', data);
  }

  async startProcess() {
    if (_.isEmpty(this.data)) {
      return this.utilService.notifyError('Empty data to start');
    }

    for (let i = 0; i < this.data.length; i++) {
      let oneData = this.data[i];
      if (oneData) {
        //create entity
        try {
          oneData = await this.createEntity(oneData);
        } catch (error) {
          console.error('create entity', error);
          throw error;
        }
        //update entity
        try {
          oneData = await this.updateEntity(oneData);
        } catch (error) {
          console.error('update entity', error);
          throw error;
        }
        //get entity detail
        try {
          oneData = await this.getEntity(oneData);
        } catch (error) {
          console.error('getEntity', error);
          throw error;
        }

        //publish cdn
        try {
          oneData = await this.publishCdn(oneData);
        } catch (error) {
          console.error('publishCdn', error);
          throw error;
        }
        this.data[i] = oneData;
      }
    }

    console.log('ALL DONE', this.data);
    this.utilService.notifySuccess('Create all entity DONE');
    //interval get status
    this.startIntervalGetStatus();
    this.source = this.data;
  }

}
