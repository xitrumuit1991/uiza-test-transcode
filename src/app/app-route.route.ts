import { UizaTypographyComponent } from './typography/typography.component';
import { ExtraOptions, Routes, RouterModule, CanActivate } from '@angular/router';
import { NgModule } from '@angular/core';
import { UizaPageNotFoundComponent } from './@core/component/page-not-found/page-not-found.component';
import {environment} from "../environments/environment";
import {UizaTestTranscodeComponent} from "./test-transcode/test-transcode.component";

let routes: Routes = [
  { path: '', redirectTo: 'test-transcode', pathMatch: 'full' },
  { path: 'test-transcode',  component: UizaTestTranscodeComponent, data: { breadcrumb: "Test transcode" }},
  { path: 'typography', component: UizaTypographyComponent,data: { breadcrumb: "Typography" }},
  { path: 'admin',  loadChildren: './admin/admin.module#AdminModule',data: { breadcrumb: "" } },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  { path: '**', component: UizaPageNotFoundComponent },
];

const config: ExtraOptions = {
  // useHash: true,
  onSameUrlNavigation: 'reload'
};

@NgModule({
  imports: [
    RouterModule.forRoot(routes, config)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
