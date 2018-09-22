import {Component, Input} from '@angular/core';
import {DomSanitizer} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-uiza-square-box',
  styleUrls: [
    './square-box.component.scss'
  ],
  templateUrl: './square-box.component.html',
})
export class UizaSquareBoxComponent {
  @Input() item:any={src:"../../../../assets/img/main_ico_guidline.png",title:"Documentation",description:"Read our guideline & get overall about us",button:"Read Now",href:"/"};
  // @Input() listItem:any= [
  //   {src:"../../../../assets/img/main_ico_guidline.png",title:"View Guidline",description:"Read our guidline & get overall about us",button:"Read Now",href:"/"},
  //   {src:"../../../../assets/img/main_ico_task.png",title:"Create a Task",description:"Create a Publish your task to your website",button:"Create Task",href:"/"},
  //   {src:"../../../../assets/img/main_ico_track.png",title:"Tracking you Analytics",description:"Get tracking your task, resource & Renvenue",button:"Tracking Now",href:"/"},
  // ];
  constructor(private _activedRoute: ActivatedRoute,
              private _router: Router,
              public sanitizer: DomSanitizer)
  {
  }

  navigate(href){
    this._router.navigate([href]);
  }
  onNavigate(link){
    window.open(link, "_blank");
  }
}
