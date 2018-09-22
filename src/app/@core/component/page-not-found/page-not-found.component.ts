import { Component } from '@angular/core';
import {ApiService} from '../../../@service';

@Component({
  selector: 'app-uiza-page-not-found',
  templateUrl: './page-not-found.component.html',
})
export class UizaPageNotFoundComponent {
  constructor(
    private _apiService:ApiService,
  ){


  // this._apiService.api.mediaEntity.get()
  }
}
