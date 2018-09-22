import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdminComponent } from './admin.component';
import { UizaPageNotFoundComponent } from '../@core/component/page-not-found/page-not-found.component';
import {UizaQuickStartComponent} from './quickstart/quickstart.component';

const routes: Routes = [{
  path: 'admin',
  data: { breadcrumb: "" },
  component: AdminComponent,
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard',component:UizaQuickStartComponent},
    { path: '**', component: UizaPageNotFoundComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {

}
