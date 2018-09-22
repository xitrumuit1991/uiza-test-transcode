import {
  Component,
  ContentChild,
  ElementRef,
  AfterContentInit,
  Input,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';
import _ from 'lodash'

@Component({
  selector: 'app-uiza-multi-radio',
  styleUrls: ['../radio.component.scss'],
  templateUrl: './multi-radio.component.html',
})

export class UizaMultiRadioComponent implements OnInit{
  currentDes
  @Input() settings: any = {
    titleKey: 'title',
    valueKey: 'value',
    block : true,
    values: [
      { title: "Actiontwo", value: 'actiontwo'},
      { title: "Smalllove", value: 'smallove' }
    ]
  };
  @Input() name;
  @Input() uizaModel: any;

  @Output() uizaModelChange = new EventEmitter();
  Check:any
  onChange = ($event) => {
    let value = $event.currentTarget.value
    if(!isNaN(value)){
        value = parseFloat(value)

    }
    this.getDescription(value)
    this.Check=value
    console.log('value',value)
    this.uizaModelChange.emit(value);
  }

  getDescription(value) {
    _.map(this.settings.values, (item) => {
      if (item.value == value) {
        this.currentDes = item.des
        console.log('currentDes', this.currentDes)
      }
    })
  }

  getDefaultDescription() {
    _.map(this.settings.values, (item) => {
      if (item.isDefaults == true) {
        this.currentDes = item.des
      }
    })
  }

  ngOnInit() {
    if(this.settings.showDescription == true)
     this.getDefaultDescription()
  }

}
