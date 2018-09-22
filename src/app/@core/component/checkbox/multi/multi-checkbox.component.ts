import { Component, ContentChild, ElementRef, AfterContentInit, Input, Output, EventEmitter } from '@angular/core';
import _ from 'lodash'

@Component({
  selector: 'app-uiza-multi-checkbox',
  styleUrls: ['../checkbox.component.scss'],
  templateUrl: './multi-checkbox.component.html',
})

export class UizaMultiCheckboxComponent {
  @Input() settings: any = {
    titleKey: 'title',
    valueKey: 'value',
    values: [
      { title: "Actiontwo", value: 'actiontwo' },
      { title: "Smalllove", value: 'smallove' }
    ]
  };
  @Input() name;
  @Input() uizaModel: any = [];
  
  @Output() uizaModelChange = new EventEmitter();

  onChange = ($event) => {
    let checked = $event.target.checked;
    let value = $event.currentTarget.value;
    let index = _.indexOf(this.uizaModel, value)

    if (index === -1 && checked) {
      this.uizaModel.push(value)
    }
    if (index !== -1 && !checked) {
      this.uizaModel.splice(index, 1)
    }

    this.uizaModelChange.emit(this.uizaModel);
  }
  correctChecked = (value) => {
    let index = _.indexOf(this.uizaModel, value)
    if (index === -1) {
      return ''
    }
    return 'checked'
  }
}
