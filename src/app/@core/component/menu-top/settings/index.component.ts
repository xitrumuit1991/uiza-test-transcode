import {Component, OnInit} from '@angular/core';
import {ApiService, UtilService, UserService} from "../../../../@service";
import {environment} from "../../../../../environments/environment";

@Component({
  selector: 'app-uiza-menu-top-settings',
  styleUrls: ['./index.component.scss'],
  templateUrl: './index.component.html',
})
export class UizaMenuTopSettingsComponent implements OnInit{
  displayDomain = window.location.hostname;
  constructor(
    private apiService : ApiService,
    private userService : UserService,
  ){

  }
  ngOnInit(){
    let userInfo: any = localStorage.getItem(environment.authenUserKey);
    try {
      userInfo = JSON.parse(userInfo);
    } catch (e) {
      userInfo = {};
    }
    if(userInfo) this.displayDomain = userInfo.domain;
  }

}
