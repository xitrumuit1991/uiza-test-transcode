import { Component, ContentChild, ElementRef, AfterContentInit, Input } from '@angular/core';

@Component({
  selector: 'app-uiza-card',
  styleUrls: ['./card.component.scss'],
  templateUrl: './card.component.html',
})

export class UizaCardComponent implements AfterContentInit {
  @ContentChild('uizaCardTitle') uizaCardTitle: ElementRef;
  @Input() settings = {
    hideHeader: false,
    hideContent: false,
    forceMaxHeight: false
  }
  ngAfterContentInit() {
    // console.log("ngAfterContentInit ", this.settings)
  }
}
