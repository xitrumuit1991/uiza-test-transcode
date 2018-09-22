import {Component} from '@angular/core';

export * from './search/index.component';
export * from './settings/index.component';
export * from './profile/index.component';

@Component({
  selector: 'app-uiza-menu-top',
  styleUrls: ['./index.component.scss'],
  templateUrl: './index.component.html',
})
export class UizaMenuTopComponent {
}
