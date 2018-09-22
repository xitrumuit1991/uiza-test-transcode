import { Component, ContentChild, ElementRef, AfterContentInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-uiza-checkbox',
  styleUrls: ['./checkbox.component.scss'],
  templateUrl: './checkbox.component.html',
})

export class UizaCheckboxComponent {
  @Input() title: any = '';
  @Input() uizaModel: any = false;

  @Input() name;

  @Output() uizaChange = new EventEmitter();
  
  onChange = ($event) => {
    this.uizaModel = !!this.uizaModel
    if (typeof this.uizaModel === 'boolean') {
      this.uizaModel = !this.uizaModel
    } else if (this.uizaModel === 1) {
      this.uizaModel = 0
    } else if (this.uizaModel === 0) {
      this.uizaModel = 1
    }
    this.uizaChange.emit(this.uizaModel);
  }
}
