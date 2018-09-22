import {Component, OnInit, ViewChild} from '@angular/core';
import * as XLSX from 'ts-xlsx';
import * as _ from 'lodash';
import {ApiService, UtilService, UserService} from "../@service/index";
import {Router} from "@angular/router";

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
              private userService: UserService,) {
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
      "name": dataExcel.name || dataExcel.url,
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
          console.log('createEntity',data);
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

  }

}
