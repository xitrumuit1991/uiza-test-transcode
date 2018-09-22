
import { UizaDatePickerComponent } from './component/date-picker/date-picker.component';
import { UizaSubscriptionTableComponent } from './component/subscription-table/subscription-table.component';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UizaTypographyComponent } from '../typography/typography.component';
import { UizaMenuLeftComponent } from './component/menu-left/index.component';
import {
  UizaMenuTopComponent,
  UizaMenuTopSearchComponent,
  UizaMenuTopProfileComponent,
  UizaMenuTopSettingsComponent
} from './component/menu-top/index.component';
import { UizaPageNotFoundComponent } from './component/page-not-found/page-not-found.component';
import { UizaHeaderContentComponent } from './component/header-content/header-content.component';
import { UizaBreadcrumbComponent } from './component/breadcrumb/breadcrumb.component';
import { UizaViewModeComponent } from './component/view-mode/view-mode.component';
import { CommonModule } from '@angular/common';
import { UizaCardComponent } from './component/card/card.component';
import { UizaSmartTableComponent } from './component/smart-table/smart-table.component';
import { UizaCheckboxComponent } from './component/checkbox/checkbox.component';
import { UizaRadioComponent } from './component/radio/radio.component';
import { UizaToggleSwitchComponent } from './component/toggle-switch/togle-switch.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UizaPaginationComponent } from './component/pagination/pagination.component';
import { UizaSmartFromComponent } from './component/smart-form/smart-form.component';
import { UizaPlayerComponent } from './component/player/player.component';

import { UizaEmptyContentComponent } from './component/empty-content/empty-content.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { UizaMultiCheckboxComponent } from './component/checkbox/multi/multi-checkbox.component';
import { UizaMultiRadioComponent } from './component/radio/multi/multi-radio.component';
import { UizaTreeViewComponent } from './component/tree-view/tree-view.component';
import { UizaModalPopupComponent } from "./component/modal-popup/modal-popup.component";
import { UizaUploadStaticComponent } from "./component/upload-static/upload-static.component";
import { UizaCardColorComponent } from './component/card-color/card-color.component';
import { UizaChartJsComponent } from './component/chart-js/chart-js.component';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UizaMonthTransform, UizaNgForObjectTransform, UizaFileSizePipe, UizaDatetimeTransform, UizaLiveTimeTransform, UizaNumberTransform, UizaSQLDatetimeTransform, UizaTimeFormatTransform } from './pipe/@index';
import { UizaTableHeadColorComponent } from './component/table-head-color/table-head-color.component';
import { UizaSquareBoxComponent } from './component/square-box/square-box.component';
import { UizaEntityPublishPackagerComponent } from "./component/entity-publish-packager/entity-publish-packager.component";
import { UizaNoticeLabelComponent } from './component/notice-label/notice-label.component';
import { UizaCardInputComponent } from './component/card-input/card-input.component';
import {ToastComponent, ToasterService} from 'angular2-toaster';
import {UizaD3JsComponent} from './component/d3-js/d3-js.component';
import { UizaDatePickerAdvanceComponent } from './component/date-picker-advance/date-picker-advance.component';
import {UizaRequestContentComponent} from './component/request-content/request-content.component';
import {HighlightCodeDirective} from './component/highlightjs/highlight.component';
import {UizaMenuTopQuickStarthComponent} from './component/menu-top/quickstart/index.component';
import {UizaNameEntityTransform} from "./pipe/nameEntity";
import {UizaPermissionList} from './component/permission-list/permission-list.component';
import {UizaDataPlusComponent} from './component/data-plus/data-plus.component';
import {TooltipModule} from 'ngx-bootstrap';
import {UizaLimitStringTransform} from "./pipe/limitString";
import { UizaMovePopupComponent } from './component/move-popup/move-popup.component';
import { NgSelectModule, NG_SELECT_DEFAULT_CONFIG } from '@ng-select/ng-select';
import {UizaDataSmartPlusComponent} from './component/data-smart-plus/data-smart-plus.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { UizaInputGroup } from './component/input-group/input-group.component';
import {UizaTestTranscodeComponent} from "../test-transcode/test-transcode.component";

const coreModuleRoute: Routes = [];

let PIPE = [
  UizaMonthTransform,
  UizaNgForObjectTransform,
  UizaFileSizePipe,
  UizaDatetimeTransform,
  UizaSQLDatetimeTransform,
  UizaLiveTimeTransform,
  UizaNumberTransform,
  UizaNameEntityTransform,
  UizaLimitStringTransform,
  UizaTimeFormatTransform,
]

let COMPONENT = [
  UizaDataSmartPlusComponent,
  UizaDataPlusComponent,
  UizaPermissionList,
  HighlightCodeDirective,
  UizaRequestContentComponent,
  UizaTypographyComponent,
  UizaMenuLeftComponent,
  UizaMenuTopComponent,
  UizaPageNotFoundComponent,
  UizaHeaderContentComponent,
  UizaBreadcrumbComponent,
  UizaViewModeComponent,
  UizaMenuTopQuickStarthComponent,
  UizaMenuTopProfileComponent,
  UizaMenuTopSearchComponent,
  UizaMenuTopSettingsComponent,
  UizaCardComponent,
  UizaSmartTableComponent,
  UizaCheckboxComponent,
  UizaRadioComponent,
  UizaToggleSwitchComponent,
  UizaPaginationComponent,
  UizaSmartFromComponent,
  UizaPlayerComponent,
  UizaEmptyContentComponent,
  UizaMultiCheckboxComponent,
  UizaMultiRadioComponent,
  UizaTreeViewComponent,
  UizaModalPopupComponent,
  UizaUploadStaticComponent,
  UizaSubscriptionTableComponent,
  UizaUploadStaticComponent,
  UizaCardColorComponent,
  UizaChartJsComponent,
  UizaDatePickerComponent,
  UizaTableHeadColorComponent,
  UizaSquareBoxComponent,
  UizaEntityPublishPackagerComponent,
  UizaNoticeLabelComponent,
  UizaCardInputComponent,
  UizaD3JsComponent,
  UizaDatePickerAdvanceComponent,
  UizaMovePopupComponent,
  UizaInputGroup,
  UizaTestTranscodeComponent,
];
@NgModule({
  declarations: [
    ...PIPE,
    ...COMPONENT,

  ],
  imports: [
    TooltipModule.forRoot(),
    NgbModule,
    CommonModule,
    FormsModule,
    RouterModule,
    DatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ReactiveFormsModule,
    NgSelectModule,
    ColorPickerModule,
  ],
  exports: [
    ...PIPE,
    ...COMPONENT
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class CoreModule {
}
