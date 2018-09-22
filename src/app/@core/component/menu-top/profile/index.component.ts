import { Router } from '@angular/router';
import { ApiService, UserService, UtilService } from 'src/app/@service';
import {Component, OnInit, ViewChild} from '@angular/core';
import { environment } from '../../../../../environments/environment';
import {UizaModalPopupComponent} from '../../modal-popup/modal-popup.component';

@Component({
  selector: 'app-uiza-menu-top-profile',
  styleUrls: ['./index.component.scss'],
  templateUrl: './index.component.html',
})

export class UizaMenuTopProfileComponent implements OnInit{
  @ViewChild(UizaModalPopupComponent) uizaModalPopupComponent: UizaModalPopupComponent
  avatar:any
  popUpComponent: any = {
    showBtnDemo: false,
    class: 'custom-modal-class',
    title: '',
    message: '',
    textCancel: 'Cancel',
    textConfirm: 'Yes',
    confirm: () => { },
    cancel: () => {
      this.uizaModalPopupComponent.hideModal()
    },
    show: () => {

    },
    hide: () => {

    },
  };
  changeAva(){
    var width=($(".top-avatar").width()-$(".top-avatar").height())/2
    // $(".choose-avatar").css('height',width)
    $(".top-avatar").css('padding-top',width+"px")
    $(".top-avatar").css('padding-bottom',width+"px")
    $(".top-avatar").css('background-size',"contain")
    // style="background-image: url({{dataImage.url}})"
  }
  constructor(private userService: UserService,
    private router: Router,
    private apiService: ApiService,
    private utilService: UtilService,
  ) {
    try {
      let userInfo: any = localStorage.getItem(environment.authenUserKey);
      userInfo = JSON.parse(userInfo);
      if(userInfo.avatar) {
        this.avatar = userInfo.avatar;
      }else {
        this.avatar = '../../../../../assets/img/ava_default_100x100.jpg';
      }
      // console.log(userInfo)
      this.displayName = userInfo.email || "Administrator";
    } catch (e) {
      console.warn(e);
    }
  }

  displayName = "NoName User";
  ngOnInit() {
    let userInfo: any = localStorage.getItem(environment.authenUserKey);
    try {
      userInfo = JSON.parse(userInfo);
    } catch (e) {
      userInfo = {};
    }
    // console.log('userInfo',userInfo);
    if(userInfo)
      this.displayName = userInfo.email;
  }

  /**
   * User logout - navigate to login page
   */
  logOut = () => {
    this.popUpComponent.title = 'Sign out'
    this.popUpComponent.message = 'Are you sure that you want to sign out?'
    this.popUpComponent.textConfirm = "Yes"
    this.popUpComponent.confirm = this.doLogout.bind(this)
    this.uizaModalPopupComponent.showModal()
    ;
  }
  doLogout(){
    this.apiService.api.adminUser.logout().then(result => {
      if (result) {
        this.userService.clearUserData();
        this.utilService.notifySuccess('Logout success');
        this.router.navigate(["/auth/login"]);
        this.uizaModalPopupComponent.hideModal()
      }
    }).catch(error => {
      this.userService.clearUserData();
      this.utilService.notifySuccess('Logout success');
      this.router.navigate(["/auth/login"]);
      this.uizaModalPopupComponent.hideModal()
    })
  }
  profile(){
    this.router.navigate(['/admin/application-setting/profile'])
  }
}
