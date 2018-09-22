import {Component, ContentChild, ElementRef, AfterContentInit, Input} from '@angular/core';

@Component({
  selector: 'app-uiza-radio',
  styleUrls: ['./radio.component.scss'],
  templateUrl: './radio.component.html',
})

export class UizaRadioComponent implements AfterContentInit {
  @Input() name;
  @Input() checked;

  ngAfterContentInit() {

  }
}
