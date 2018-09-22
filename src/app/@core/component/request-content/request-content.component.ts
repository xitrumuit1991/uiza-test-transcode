import {Component, ContentChild, ElementRef, AfterContentInit} from '@angular/core';

@Component({
  selector: 'app-uiza-request-content',
  styleUrls: ['./request-content.component.scss'],
  templateUrl: './request-content.component.html',
})

export class UizaRequestContentComponent implements AfterContentInit {
  @ContentChild('uizaCardTitle') uizaCardTitle: ElementRef;

  ngAfterContentInit() {
  }
}
