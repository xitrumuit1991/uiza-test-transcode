import {NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UizaLoginComponent} from "./component/login/login.component";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
const authModuleRoute: Routes = [
  {
    path: 'auth',
    children:[
      {
        path: '',
        redirectTo : 'login',
        pathMatch : 'full'
      },
      {
        path : 'login',
        component: UizaLoginComponent
      }
    ]
  },
];

@NgModule({
  declarations: [
    UizaLoginComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(authModuleRoute),
    FormsModule
  ],
  exports: [
    RouterModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AuthModule{}

