import { Component, ContentChild, ElementRef, AfterContentInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-uiza-toggle-switch',
  styleUrls: ['./toggle-switch.component.scss'],
  templateUrl: './toggle-switch.component.html',
})

export class UizaToggleSwitchComponent  {
  @Input() uizaModel: any = false;
  @Input() name;

  @Output() uizaModelChange = new EventEmitter();
  
  onChange = ($event) => {

    if (typeof this.uizaModel === 'boolean') {
      this.uizaModel = !this.uizaModel
    } else if (this.uizaModel === 1) {
      this.uizaModel = 0
    } else if (this.uizaModel === 0) {
      this.uizaModel = 1
    }
    this.uizaModelChange.emit(this.uizaModel)
  }
}
