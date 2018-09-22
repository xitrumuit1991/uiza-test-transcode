import { BrowserModule } from '@angular/platform-browser';
import { NgModule,APP_INITIALIZER } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToasterModule, ToasterService, ToasterContainerComponent } from 'angular2-toaster'; //notifycation
import { ModalModule, AlertModule, BsDatepickerModule } from 'ngx-bootstrap';//https://valor-software.com/ngx-bootstrap
import { AppComponent } from './app.component';
import { CoreModule } from './@core/core.module';
import { AuthModule } from './auth/auth.module';
import { AppRoutingModule } from './app-route.route';

import { ApiService, UtilService, UserService, InitAppService } from './@service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { AdminModule } from './admin/admin.module';
import { UizaCardComponent } from './@core/component/card/card.component';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { DeviceDetectorModule } from 'ngx-device-detector';
import * as $ from 'jquery';
@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    DeviceDetectorModule.forRoot(),
    LoadingBarModule.forRoot(),
    BrowserAnimationsModule,
    CoreModule,
    HttpModule,
    HttpClientModule,
    NgbModule.forRoot(),
    BrowserModule,
    AuthModule,
    CommonModule,
    AdminModule,
    AppRoutingModule,
    ToasterModule.forRoot(),
    ModalModule.forRoot(),
  ],
  
  providers: [
    ApiService,
    UtilService,
    UserService,
    InitAppService,
    InitAppService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
