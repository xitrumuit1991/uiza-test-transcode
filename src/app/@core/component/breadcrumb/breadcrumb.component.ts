import {Component, OnInit} from '@angular/core';
// import {Router, ActivatedRoute, NavigationEnd,Params,PRIMARY_OUTLET} from '@angular/router';
import {Router, ActivatedRoute, NavigationEnd,Params,PRIMARY_OUTLET,Event} from "@angular/router";
import {filter} from 'rxjs/internal/operators';
import {hostReportError} from 'rxjs/internal/util/hostReportError';

export interface IBreadcrumb {
  label: string;
  params: Params;
  url: string;
}
@Component({
  selector: 'app-uiza-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss'],

})


export class UizaBreadcrumbComponent implements OnInit{
  public breadcrumbs: IBreadcrumb[];
  constructor(
              private _router: Router,
              private _activatedRoute:ActivatedRoute,
  ) {
  }




  async ngOnInit() {
    const ROUTE_DATA_BREADCRUMB = "breadcrumb";
    //check refresh page
    let root: ActivatedRoute = this._activatedRoute.root;
    this.breadcrumbs = this.getBreadcrumbs(root);
    //check when change route
    await this._router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        //set breadcrumbs
        let root: ActivatedRoute = this._activatedRoute.root;
        this.breadcrumbs = this.getBreadcrumbs(root);
      })
    ;
  }

  goToHref(href){
    console.log(href)
    this._router.navigate([href]);
  }

  private getBreadcrumbs(route: ActivatedRoute, url: string="", breadcrumbs: IBreadcrumb[]=[]): IBreadcrumb[] {
    const ROUTE_DATA_BREADCRUMB= "breadcrumb";

    //get the child routes
    let children: ActivatedRoute[] = route.children;

    //return if there are no more children
    if (children.length === 0) {
      return breadcrumbs;
    }

    //iterate over each children
    for (let child of children) {
      //verify primary route
      if (child.outlet !== PRIMARY_OUTLET) {
        continue;
      }

      //verify the custom data property "breadcrumb" is specified on the route
      if (!child.snapshot.data.hasOwnProperty(ROUTE_DATA_BREADCRUMB)) {
        return this.getBreadcrumbs(child, url, breadcrumbs);
      }
      //get the route's URL segment
      let routeURL: string = child.snapshot.url.map(segment => segment.path).join("/");

      //append route URL to URL
      url += `/${routeURL}`;

      //add breadcrumb
      let breadcrumb: IBreadcrumb = {
        label: child.snapshot.data[ROUTE_DATA_BREADCRUMB],
        params: child.snapshot.params,
        url: url
      };
      if (breadcrumb.label != '') {
        breadcrumbs.push(breadcrumb);
      }
      //recursive
      return this.getBreadcrumbs(child, url, breadcrumbs);
    }
  }
}
