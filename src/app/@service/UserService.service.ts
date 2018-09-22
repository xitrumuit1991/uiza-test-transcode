import { ApiService } from './ApiService.service';
import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as _ from 'lodash';
import { environment } from '../../environments/environment';
import { Engine } from '../@Common/engine.common';

@Injectable()
export class UserService {
  constructor(private _http: Http,
    private apiService: ApiService) {
  }

  /**
   * Call for login to applciation - get token - save to localStorage
   */
  login = async (account) => {
    try {
      const response = await this.apiService.api.auth.login(account);
      // console.log(response)
      if (response.code === 200 && response.data) {
        const { token } = response.data;
        localStorage.setItem(environment.authenTokenKey, token);

        const userProfile = await this.apiService.api.adminUser.profile();
        if(userProfile && userProfile.data)
        {
          const domain = await this.apiService.api.adminDomain.get({id: userProfile.data.domainId});
          if(domain){
            userProfile.data.appId = domain.appId;
            userProfile.data.domain = domain.domain;
          }
          localStorage.setItem(environment.authenUserKey, JSON.stringify(userProfile.data));
          return true;
        }else{
          return true;
        }
      } else {
        return response && response.message;
      }
    } catch (e) {
      // window.alert("login fail ! " + e)
      return e;
    }
  }

  clearUserData = () => {
    Engine.clearUserData();
  }

  isLogged(): boolean {
    if (localStorage.getItem(environment.authenTokenKey) && localStorage.getItem("userInfo")) {
      return true;
    }
    return false;
  }

  getToken(): string {
    return localStorage.getItem(environment.authenTokenKey);
  }

  setToken(data) {
    if (_.isString(data))
      localStorage.setItem[environment.authenTokenKey] = data;
    if (_.isObject(data) || _.isArray(data))
      data = JSON.stringify(data)
    localStorage.setItem(environment.authenTokenKey, data);
  }

  getUser(): any {
    let user = null;
    if (window.localStorage["userInfo"]) {
      try {
        user = JSON.parse(window.localStorage["userInfo"]);
      } catch (e) {
        return null;
      }
    }
    return user;
  }
  setUser(data): any {
    if(data && _.isObject(data)){
      window.localStorage["userInfo"] = JSON.stringify(data);
    }else if(_.isString(data)){
      window.localStorage["userInfo"] = data;
    }
  }

}
