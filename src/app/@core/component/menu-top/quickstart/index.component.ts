import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-uiza-menu-top-quick-start',
  styleUrls: ['./index.component.scss'],
  templateUrl: './index.component.html',
})
export class UizaMenuTopQuickStarthComponent {
  constructor(private _activedRoute: ActivatedRoute,
              private _router: Router,
              public sanitizer: DomSanitizer)
  {
  }  navigate(href){
    console.log(href)
    this._router.navigate([href]);
  }
}
