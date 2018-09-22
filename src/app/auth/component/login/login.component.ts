import { ApiService } from './../../../@service/ApiService.service';
import { Component } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { UtilService, UserService } from 'src/app/@service';
import {environment} from "../../../../environments/environment";
@Component({
  selector: 'app-uiza-login',
  styleUrls:['./login-page.component.scss'],
  templateUrl: './login-page.component.html',
})

export class UizaLoginComponent {
  account: Account = new Account();
  isLocal = false;
  isLoading: any = false;
  isError:any;
  param = {
    jwt: '',
  }
  autoLogin = true;

  constructor(private apiService: ApiService,
    private router: Router,
    private utilService: UtilService,
    private userService: UserService,
    private activedRoute: ActivatedRoute) {
    if (this.userService.isLogged()) {
      this.router.navigate(["/test-transcode"]);
    }


    this.account.domain = window.location.hostname;
    if(this.account.domain ==='localhost' || this.account.domain === 'local.uiza.io' || this.account.domain === 'local.uizadev.io' || this.account.domain === 'local.uiza.co'){
      // console.log('localhost set domain');
      this.isLocal = true;
      this.account.username = "trunglh@uiza.io";
      this.account.password = "123456789";
      this.account.domain = "chivas69.uizadev.io";
    }

  }

  async ngOnInit(){
    this.param.jwt = this.activedRoute.snapshot.queryParamMap.get('t');
    // this.param.jwt = window.location.search.substr(3);
    if(this.param.jwt){
      const response = await this.userService.login(this.param);
      // console.log("onSubmit ", response);
      if (response === true) {
        this.router.navigate(["/test-transcode"]);
      } else {
        this.autoLogin = false;
        this.utilService.notifyError(response.message);
        // console.log("Login fail message : ", response);
      }
    }else {
      this.autoLogin = false;
    }
  }

  /**
   * onSubmit: login
   */
  onSubmit = async () => {
    if(!this.account.username || !this.account.password){
      this.utilService.notifyError('Please input email and password');
      return;
    }
    this.utilService.startLoading();
    this.isLoading = true;

    const response = await this.userService.login(this.account);
    this.utilService.stopLoading();
    this.isLoading = false;
    console.log("onSubmit ", response);
    if (response === true) {
      this.router.navigate(["/test-transcode"]);
    } else {
      console.error(response);
      this.utilService.notifyError(response.message);
    }
  }

  forgetPassword(){
    let domain = window.location.host.split('.')[0]
    if(window.location.hostname ==='localhost'){
      return window.location.href = '//dev-id.uizadev.io/forget/password/' + domain;
    }
    if(window.location.hostname.indexOf('.uizadev.io') >= 0)
      return window.location.href = '//dev-id.uizadev.io/forget/password/' + domain;
    if(environment.env ==='staging'){
      if(window.location.hostname.indexOf('.uiza.co') >= 0)
        return window.location.href = '//stag-id.uiza.io/forget/password/' + domain;
    }
    if(environment.env ==='production' && environment.production === true)
    {
      if(window.location.hostname.indexOf('.uiza.co') >= 0)
        return window.location.href = '//id.uiza.io/forget/password/' + domain;
    }

  }
}
class Account {
  username;
  password;
  domain;
}
