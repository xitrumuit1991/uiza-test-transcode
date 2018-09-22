import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService, UtilService} from '../../@service';
import {BsModalService} from 'ngx-bootstrap/modal';
import * as _ from 'lodash';
import * as hljs from 'highlight.js';
import {HighlightCodeDirective} from '../../@core/component/highlightjs/highlight.component';
import {UizaPlayerComponent} from '../../@core/component/player/player.component';
import {interval} from 'rxjs';
import * as curlparse from 'parse-curl/index.js'
import {environment} from '../../../environments/environment';
import {Http} from '@angular/http';
@Component({
  selector: 'app-uiza-quick-start',
  styleUrls: [
    './quickstart.component.scss'
  ],
  templateUrl: './quickstart.component.html',
})
export class UizaQuickStartComponent implements OnInit,OnDestroy {
  @ViewChild('embedElementVod') embedElementVod: ElementRef;
  @ViewChild('embedElementLive') embedElementLive: ElementRef;

  @ViewChild(UizaPlayerComponent) uizaPlayerComponent: UizaPlayerComponent;
  //Todo Var Setting
  step = 1;
  key:any
  data: any = {};
  httpkey:any
  // dataResponse: any = [];
  intervalIds: any = [];
  destinationUpload = [
    {
      title: 'VOD',
      isActive: true,
      step:1,
      runStep2:false,
      dataResponse:[],
      dataResponseStep3:"",
      progressBarPercent:0,
      playerOptions:{
        ratio: '16:9',
      },
      check:[],
      formSource:""
    },
    {
      title: 'Livestream',
      isActive: false,
      step:1,
      runStep2:false,
      dataResponse:[],
      dataResponseStep3:"",
      progressBarPercent:0,
      playerOptions:{
        ratio: '16:9',
      },
      check:[],
      formSource:""
    }

  ];
  intervalIds1:any=[]

  selectedDestination: any = this.destinationUpload[0];
  // runStep2 = false;
  // dataResponseStep3: string ="";
  // progressBarPercent: any = 0;
  region:any
  //Todo Restart when change Vod or Live
  activeLinkDestination(item) {
    _.map(this.destinationUpload, (ite) => {
      ite.isActive = (item.title === ite.title ? true : false);
    });
    this.selectedDestination = item;
  }
  destroy(select){
    select.step = 1;
    select.dataResponse = [];
    select.runStep2 = false;
    select.dataResponseStep3 = "";
    select.progressBarPercent = 0;
    select.check=[]
    // clearInterval(this.intervalIds);
  }
  //Todo Vod Form Setting
  formSourceVod: any = {
    inputType: 'http',
    type: 'vod',
    name: 'Demo Video',
    url: 'http://static.uiza.io/media/big_buck_bunny_720p_10mb.mp4',
  };
  formSettingVod: any = {
    viewEnable: false,
    viewMode: true,
    submitDisable: true,
  };
  formInputVod: Array<any> = [{
    col: 12,
    body: [
      {
        col: 6,
        title: 'Name',
        type: 'text',
        key: 'name',
        // placeholder: 'Demo Video',
        require: true,
        flex: true
      }, {
        col: 6,
        title: 'URL',
        type: 'text',
        key: 'url',
        // placeholder: 'http://static.uiza.io/media/big_buck_bunny_720p_10mb.mp4',
        require: true,
        flex: true
      }
    ]
  }
  ];

  //Todo Live Form Setting
  formSourceLive: any = {
    'eventType': 'broad',
    'encode': 0,
    'mode': 'pull',
    'resourceMode': 'single',
    'name':"Demo 1",
    "Fallback":"https://www.youtube.com/watch?v=UhNX5NdJCs4"

  };
  formSettingLive: any = {
    viewEnable: false,
    viewMode: true,
    submitDisable: true,
  };
  formInputLive: Array<any> = [{
    col: 12,
    body: [
      {
        col: 6,
        title: 'Name',
        type: 'text',
        key: 'name',
        placeholder: 'Input Channel Name',
        require: true,
        flex: true
      },
      {
        col: 6,
        title: 'Fallback link',
        type: 'text',
        key: 'Fallback',
        placeholder: 'Input url of Video',
        require: true,
        flex: true,
      },
      {
        col: 6,
        title: 'Encode',
        key: 'encode',
        type: 'multiRadio',
        flex: true,
        onChange :(data)=>{},
        settings: {
          values: [
            {title: 'Yes', value: 1},
            {title: 'No', value: 0}
          ]
        }
      },
      {
        col: 6,
        title: 'Feed type',
        key: 'mode',
        type: 'multiRadio',
        flex:true,
        onChange :(data)=>{
        },
        settings: {
          values: [
            { title: 'Pull', value: 'pull' },
          ]
        }
      }
    ]
  }
  ];


  nextStep(select) {
    if (select.step == 1) {
      if (select.playerOptions.id) {
        if (select.progressBarPercent == 100) {
          select.step++;
          // window.scrollTo(0,document.body.scrollHeight);
          console.log(JSON.stringify(select.playerOptions))
          this.intervalIds=setInterval(
            data=>{
              if(typeof this.uizaPlayerComponent!=undefined){
                this.showEmbed(select);
                console.log(this.uizaPlayerComponent.generateIframe())
                this.dataoutHTML(select,this.uizaPlayerComponent.generateIframe())
                clearInterval(this.intervalIds)
                window.scrollTo(0,$('.uiza-body-content').outerHeight())
              }
            }
          ,300 )

        }
        else {
          this.utilService.notifyError('Publish Progress is ' + select.progressBarPercent + '%.Please waitting and try again....');
        }
      }
      else {
        this.utilService.notifyError('Please Run Before');
      }
    }
    else {
      window.scrollTo(0,$('.uiza-body-content').outerHeight())
      // select.step++;
    }
  }

  playerOptions: any = {
    ratio: '16:9',
  };

  // get curlRequest () {
  //   return this.test1.value
  // }
  //
  // set curlRequest (v) {
  //   try{
  //     this.test1.value =v}
  //   catch(e) {
  //     console.log('error occored while you were typing the JSON');
  //   };
  // }


  run(select) {
    console.log(select.formSource)
    select.dataResponse = [];
    console.log(select.step);
    for (i = 0, i < select.check.length; i++;) {
      select.check[i]=0
    }
    var options=curlparse(select.formSource)
    console.log(options)
    try {
      options.body=JSON.parse(options.body);
    }
    catch(error) {
      if (error)
        return this.utilService.notifyError('Syntax Error! Change your params and try again...');
    }

    //Todo Vod
    if (select.step == 1 && this.selectedDestination.title == 'VOD') {
      var i=0;
      select.progressBarPercent = 0;
      select.playerOptions.streamType = 'vod';
      select.runStep2 = true;
      if(!this.formSourceVod.name || this.formSourceVod.name === ''){
        this.formSourceVod.name = 'Demo Video';
      }
      if(!this.formSourceVod.url || this.formSourceVod.url === ''){
        this.formSourceVod.url = 'http://static.uiza.io/media/big_buck_bunny_720p_10mb.mp4';
      }
      // select.playerOptions.name=this.formSourceVod.name
      select.playerOptions.name=options.body.name
      this.http.request(options.url, {
        method: options.method ,
        headers: options.header ,
        body: options.body
      }).toPromise().then(results => {
        var result=results.json()
        select.playerOptions.id = result.data.id;
        select.playerOptions.entityId=result.data.id
        select.check[i]=1
        i++
        this.apiService.api.mediaEntity.get({id: result.data.id}).then(async resu => {
          select.playerOptions.name = resu.data.name;
          select.check[i]=1
          i++
          this.dataout(select,resu, 0);
          await this.apiService.api.mediaEntity.publish({id: result.data.id}).then(res => {
            this.intervalIds1 = (setInterval(() => {
                  this.apiService.api.mediaEntity.publishGetStatus({id: result.data.id}).then(resultpublish => {
                      if (resultpublish && resultpublish.data) {
                        if (resultpublish.data.progress > select.progressBarPercent) {
                          select.progressBarPercent = resultpublish.data.progress;
                        }
                        if (resultpublish.data.progress < 30 && select.progressBarPercent < 30) {
                          select.progressBarPercent += 2;
                        }
                        else if (resultpublish.data.progress < 90 && resultpublish.data.progress >= 30 && select.progressBarPercent < 90) {
                          select.progressBarPercent += 2;
                        }

                        ;
                      }
                      if (resultpublish.data.progress == 100) {
                        clearInterval(this.intervalIds1);
                        this.apiService.api.mediaEntity.get({id: result.data.id}).then(async re => {
                          select.dataResponse=[]
                          select.check[i]=1
                          this.dataout(select,re, 0);
                          this.nextStep(select)
                        }).catch(err=>{
                          select.dataResponse=[]
                          this.dataout(select,err, 0);
                        })
                      }
                    }
                  )
                }
                , 5000)
            );
          }).catch(async erro => {
            select.runStep2 = false;
            await this.dataout(select,erro, 0);
          });
        }).catch(async err => {
          select.runStep2 = false;
          select.check[i]=2;
          i=0
          await this.dataout(select,err, 0);
        })
        ;
      }).catch(async error => {
        select.runStep2 = false;
        select.check[i]=2
        i=0;
        await this.dataout(select,error.json(), 0);
      })
      ;
    }

    // Todo Live stream
    if (select.step == 1 && this.selectedDestination.title == 'Livestream') {
      select.progressBarPercent = 0;
      select.playerOptions.streamType = 'live';
      select.playerOptions.name=this.formSourceLive.name
      select.playerOptions.streamName=this.formSourceLive.channelName
      select.runStep2 = true;
      var i=0

      this.http.request(options.url, {
        method: options.method ,
        headers: options.header ,
        body: options.body
      }).toPromise().then(results => {
        var result=results.json()
        select.check[i]=1
        i++
        select.playerOptions.id = result.data.id;
        select.playerOptions.entityId=result.data.id
        select.playerOptions.region=this.region
        select.dataResponse=[]
        this.dataout(select,result, 0);
        select.progressBarPercent = 30;

        this.apiService.api.live['event.start']({id: result.data.id}).then(resu => {
          select.check[i]=1
          i++
          select.dataResponse=[]
          this.dataout(select,resu, 0);
          select.progressBarPercent += 30;
          this.intervalIds=(setInterval(()=>{
            this.apiService.api.live.list({id: result.data.id}).then((res) => {
              select.dataResponse=[]
              this.dataout(select,res, 0);
              if(res.data.lastProcess=='start') {
                clearInterval(this.intervalIds)
                select.progressBarPercent = 100;
                select.check[i]=1
                this.nextStep(select)
              }

            }).catch(async err => {
              select.dataResponse=[]
              await this.dataout(select,err, 0);
            });
          },5000))

        }).catch(async erro => {
          select.dataResponse=[]
          select.runStep2 = false;
          select.check[i]=2;
          i=0
          await this.dataout(select,erro, 0);
        })
        ;

      }).catch(async error => {
        var err=error.json()
        select.dataResponse=[]
        select.runStep2 = false
        select.check[i]=2;
        i=0
        if (err.data && err.data.message=="This channelName is exist!")
        {this.utilService.notifyError("Change another name and try again")}
        await this.dataout(select,err, 0);
      })
      ;
    }
  }


  showEmbed(select) {
    select.dataResponseStep3 = "";
    this.uizaPlayerComponent.options = {
      ratio: '16:9',
      streamType: select.playerOptions.streamType,
      entityId: select.playerOptions.id,
      streamName: select.playerOptions.streamName,
      region: this.region
    };
    // this.dataResponseStep3 = this.uizaPlayerComponent.generateIframe()

  }
  test="<div style=\"position: relative; display: block; max-width: 100%;\"><div style=\"padding-bottom: 56.25%;\"><iframe id=\"iframe-3d61c2a7-870b-48ed-96ec-d10aa9616355\" width=\"100%\" height=\"100%\" src=\"https://dev-sdk.uiza.io/#/3b1fef0ad3dd4b34a681a1deccce304e/live/3d61c2a7-870b-48ed-96ec-d10aa9616355/embed?iframeId=iframe-3d61c2a7-870b-48ed-96ec-d10aa9616355&streamName=sammsmasams&region=ap-southeast-1&env=dev&api=ZGV2LWFwaS51aXphZGV2Lmlv&version=3\" style=\"position: absolute; top: 0px; right: 0px; bottom: 0px; left: 0px;\"frameborder=\"0\" allowfullscreen=\"allowfullscreen\" webkitallowfullscreen=\"webkitallowfullscreen\" mozallowfullscreen=\"mozallowfullscreen\"></iframe></div></div>"
  dataoutHTML(select,data){
    select.dataResponseStep3=data.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;")

    // data.replace(/\</,"kmkmkm")
    // console.log(data)
  }
  constructor(private utilService: UtilService,
              private apiService: ApiService,
              public sanitizer: DomSanitizer,
              private modalService: BsModalService,
              private _router:Router,
              private http:Http,
              ) {
    if(environment.env !="development"){
      this.httpkey="https"
    }
    else{
      this.httpkey="http"
    }
    // this.dataoutHTML(this.test)

  }

  getMarginLeft(data) {
    return data * 15;
  }
  copyEmbedCode(text, event) {
    const self = this;
    this.utilService.copyToClipboard(text, function() {
      self.utilService.notify('Embed Code', 'Copy success');
    }, function() {
      self.utilService.notify('Embed Code', 'Press Ctr+C / Command+C to copy');
    }, event);
  }
  viewDemo() {
    const url = this.uizaPlayerComponent.generatePreviewUrl();
    window.open(url, '_blank');
  }

  dataout(select,data, i) {
    if (_.isArray(data)) {
      select.dataResponse.push({value: '[', level: i});
      i++;
      _.map(data, async item => {
        select.dataResponse.push({value: '{', level: i});
        i++;
        this.dataout(select,item, i);
        i--;
        await select.dataResponse.push({value: '}', level: i});
      });
      i--;
      select.dataResponse.push({value: ']', level: i});
    }
    else {
      _.forIn(data, async (value, key) => {
        if (_.isArray(value)) {
          select.dataResponse.push({value: key + ':[', level: i});
          i++;
          _.map(value, async (val) => {
            if (_.isObject(val)) {
              select.dataResponse.push({value: '{', level: i});
              i++;
              this.dataout(select,val, i);
              i--;
              await select.dataResponse.push({value: '}', level: i});
            }
            else {
              select.dataResponse.push({value: JSON.stringify(val), level: i});
            }
          });
          i--;
          await select.dataResponse.push({value: ']', level: i});

        }
        else {
          if (_.isObject(value)) {
            select.dataResponse.push({value: key + ':{', level: i});
            i++;
            this.dataout(select,value, i);
            i--;
            await select.dataResponse.push({value: '}', level: i});
          }
          else {
            select.dataResponse.push(
              {
                value: key + ':' + JSON.stringify(value),
                level: i
              }
            );
          }
        }
      });
    }
  }

  onTextAreaChange : any = (event)=>{
    this.selectedDestination.formSource = event.target.value;
  }
  formChange(ev){
    this.formSourceLive.channelName = this.formSourceLive.name.toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    this.formSourceLive.linkStream=[]
    this.formSourceLive.linkStream.push(this.formSourceLive.Fallback)
    this.selectedDestination.formSource=
      "curl -X POST \\\n" +
      "  '"+this.httpkey+"://"+environment.apiUrl+"/api/private/v3/live/entity' \\\n" +
      "  -H 'Authorization: "+this.key.keyValue+ "' \\\n" +
      "  -H 'Content-Type: application/json' \\\n" +
      "  -d '{\n" +
      "    \"eventType\": \"broad\",\n" +
      "    \"encode\":"+this.formSourceLive.encode+",\n" +
      "    \"mode\": \"pull\",\n" +
      "    \"resourceMode\": \"single\",\n" +
      "    \"name\": "+`"${this.formSourceLive.name}"`+",\n" +
      "    \"channelName\":"+`"${this.formSourceLive.channelName}"`+",\n" +
      "    \"linkStream\":"+ `${JSON.stringify(this.formSourceLive.linkStream)}`+"\n" +
      "}'"
    $('#textarea'+this.selectedDestination.title).val(this.selectedDestination.formSource)
    console.log(this.selectedDestination.formSource)
  }
  navigate(href){
    console.log(href)
    this._router.navigate([href]);
  }
  async ngOnInit() {
    window.localStorage.setItem('quickStartViewed', 'true');
    $('body').removeClass('disable');

    this.key= await this.apiService.api.key.get()
    if (this.key.data.length==0){
      await this.apiService.api.key.create({"name":"Uiza","type":"privateKey","description":""})
      this.key=await this.apiService.api.key.get()
      this.key=this.key.data[0]
    }
    else{
      this.key=this.key.data[0]
    }

    this.destinationUpload[0].formSource=
    "curl -X POST \\\n" +
    "  '"+this.httpkey+"://"+environment.apiUrl+"/api/private/v3/media/entity' \\\n" +
    "  -H 'Authorization: "+this.key.keyValue+ "' \\\n" +
    "  -H 'Content-Type: application/json' \\\n" +
    "  -d '{\n" +
    "    \"inputType\": \"http\",\n" +
    "    \"type\": \"vod\",\n" +
    "    \"name\":\"Demo Video\",\n" +
    "    \"url\": \"http://static.uiza.io/media/big_buck_bunny_720p_10mb.mp4\"\n" +
    "}'"
    console.log(this.formSourceLive)
    this.formSourceLive.channelName = this.formSourceLive.name.toLowerCase().replace(/-+/g, '').replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    this.formSourceLive.linkStream=[]
    this.formSourceLive.linkStream.push(this.formSourceLive.Fallback)
    this.destinationUpload[1].formSource=
      "curl -X POST \\\n" +
      "  '"+this.httpkey+"://"+environment.apiUrl+"/api/private/v3/live/entity' \\\n" +
      "  -H 'Authorization: "+this.key.keyValue+ "' \\\n" +
      "  -H 'Content-Type: application/json' \\\n" +
      "  -d '{\n" +
      "    \"eventType\": \"broad\",\n" +
      "    \"encode\":"+this.formSourceLive.encode+",\n" +
      "    \"mode\": \"pull\",\n" +
      "    \"resourceMode\": \"single\",\n" +
      "    \"name\": "+`"${this.formSourceLive.name}"`+",\n" +
      "    \"channelName\":"+`"${this.formSourceLive.channelName}"`+",\n" +
      "    \"linkStream\":"+ `${JSON.stringify(this.formSourceLive.linkStream)}`+"\n" +
      "}'"
    this.data.appId = JSON.parse(localStorage.userInfo).appId;
    this.data.token = localStorage.uiza_token;
    await this.apiService.api.configAWS.get({configName: 'region'}).then((result) => {
      if (result && result.data) this.region = result.data.configValue;
    }).catch((error) => {
    });
  }
  ngOnDestroy(){
    clearInterval(this.intervalIds)
    clearInterval(this.intervalIds1)
  }
}
