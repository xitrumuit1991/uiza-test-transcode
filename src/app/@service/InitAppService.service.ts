import {Injectable} from '@angular/core';
import {Http, Response, RequestOptions} from '@angular/http';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as _ from 'lodash';
import {Engine} from "../@Common/engine.common";

@Injectable()
export class InitAppService {
  constructor(private _http: Http,
              private httpClient: HttpClient, )
  { }

  getProfileUser(): Promise<any>{
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem(environment.authenTokenKey);
      if(!token || _.isEmpty(token)) return resolve(null);
      let headers = {headers:  new HttpHeaders().set('Authorization', token)};
      this.httpClient.get( `//${environment.apiUrl}/api/private/v3/admin/user/current`,headers )
        .toPromise()
        .then((result: any) => {
          if(!result || !result.data || !result.data.domainId) return resolve(null);

          this.httpClient.get( `//${environment.apiUrl}/api/private/v3/admin/domain?id=${result.data.domainId}`, headers )
          .toPromise()
          .then( (domain:any) => {
            if(domain){
              result.data.appId = domain.appId;
              result.data.domain = domain.domain;
              this.setAnalyticFlag(domain.appId);
            }
            localStorage.setItem(environment.authenUserKey, JSON.stringify(result.data));
            return resolve(null);
          }).catch(error=>{
            Engine.clearUserData();
            console.error('Error InitAppService check token; clearUserData; err=', error);
            return resolve(null);
          });
        }).catch((err: HttpErrorResponse)=>{
          Engine.clearUserData();
          console.error('Error InitAppService check token; clearUserData; err=', err);
          return resolve(null);
        });
    });
  }

  changeApiUrl(): Promise<any>{
    return new Promise((resolve, reject) => {
      let domainApp = window.location.hostname;
      if(domainApp === 'localhost' || domainApp === 'dev-app.uizadev.io' || domainApp.indexOf('uizadev.io') >= 0 || domainApp === 'local.uiza.io' || domainApp === 'local.uiza.co')
      {
        environment.apiUrl = 'dev-api.uizadev.io';
      }
      else{
        let regrexDomain = new RegExp(/^[a-zA-Z0-9\-\_]+/);
        let result = domainApp.match(regrexDomain);
        let prefixDomainApi = result ? result[0] : null;
        if(prefixDomainApi)
        {
          if(domainApp.indexOf('uiza.io') >= 0)
            environment.apiUrl = `${result[0]}-api.uiza.io`;
          else if(domainApp.indexOf('uiza.co') >= 0)
            environment.apiUrl = `${result[0]}-api.uiza.co`;
          else if (domainApp.indexOf('uizadev.io') >= 0)
            environment.apiUrl = `${result[0]}-api.uizadev.io`;
        }
      }
      return resolve(null);
    });
  }

  getConfigFromUAM(): Promise<any>{
    return new Promise((resolve, reject) => {
      environment['configFromUAM'] = {
        api : 'config-from-uam-api.uizadev.io',
        static : 'config-from-uam-static.uizadev.io',
        live : 'config-from-uam-live.uizadev.io',
        vod : 'config-from-uam-vod.uizadev.io',
        app : 'config-from-uam.uizadev.io',
        app_id : 'config-from-uam-app_id',
        demo : true,
      };
      return resolve(null);
    });
  }

  getUserHashIntercom():Promise<any>{
    //todo call api module to get user_hash (user logged)
    return new Promise((resolve, reject) => {
      if(_.isEmpty(localStorage.getItem(environment.authenUserKey)) || _.isEmpty(localStorage.getItem(environment.authenTokenKey)))
        return resolve(null);
      let userInfo = null;
      try{ userInfo = JSON.parse(localStorage.getItem(environment.authenUserKey));
      }catch(e){ return resolve(null); }
      if(_.isEmpty(userInfo) || _.isEmpty(userInfo.id))
        return resolve(null);
      let headers = {headers:  new HttpHeaders().set('Authorization', localStorage.getItem(environment.authenTokenKey))};
      this.httpClient.post( `//${environment.apiUrl}/api/private/v3/admin/app/intercom/generate-hmac`, {userId : userInfo.id} , headers )
      .toPromise()
      .then( (result:any) => {
        if(_.isEmpty(result) || _.isEmpty(result.data) || _.isEmpty(result.data.hash))
          return resolve(null);
        localStorage.setItem(environment.user_hash, JSON.stringify(result.data.hash));
        return resolve(null);
      }).catch(error=>{
        console.error('Error getUserHashIntercom; err=', error);
        return resolve(null);
      });
    });
  }
  setAnalyticFlag(appId){
    const appIdtest=['a9ad1b44c05747e8870917e5ae9e956b','60c8ee30896d40a6952d90f1ba093ea5'];
    if(appIdtest.indexOf(appId)>-1){
      localStorage.setItem('flag','true');
    }
  }
}
