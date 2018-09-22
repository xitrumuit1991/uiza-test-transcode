import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-route.route';
import { CoreModule } from '../@core/core.module';
import { CommonModule } from '@angular/common';
import { ApiService } from '../@service';
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { ToasterModule } from 'angular2-toaster';
import {UizaQuickStartComponent} from './quickstart/quickstart.component';


@NgModule({
  declarations: [
    AdminComponent,
    UizaQuickStartComponent,
  ],
  imports: [
    CoreModule,
    CommonModule,
    AdminRoutingModule,
    ToasterModule.forRoot(),
  ],
  providers: [ApiService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})

export class AdminModule {
}
