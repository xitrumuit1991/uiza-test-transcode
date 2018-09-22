import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ToasterModule, ToasterService, ToasterConfig,ToasterContainerComponent} from 'angular2-toaster';
import {ActivatedRoute, Router} from "@angular/router";
import { Event, NavigationStart, NavigationEnd, NavigationError } from '@angular/router';
import {UserService, UtilService} from "./@service";
import { environment } from '../environments/environment';
declare var ga: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit
{
  private titleNotify:any = 'Browser Push Notifications!';

  public configToaster: any = new ToasterConfig({
    showCloseButton: true,
    tapToDismiss: true,
    timeout: 5*1000, //3s
    animation: 'slideDown', //'fade', 'flyLeft', 'flyRight', 'slideDown', and 'slideUp'.
    limit: 1,
    positionClass: 'toast-top-center'
  });//
  constructor(private router: Router,
              private utilService: UtilService,
              private userService: UserService,
              private activateRoute: ActivatedRoute,
              )
  {
  }

  ngOnInit(){
  }

  ngAfterViewInit(){
  }
}
