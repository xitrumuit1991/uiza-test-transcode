import { Component, ElementRef, ViewChild, ChangeDetectorRef, Input, Output, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/@service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-uiza-subscription-table',
  templateUrl: './subscription-table.component.html',
  styleUrls: ['./subscription-table.component.scss']

})
export class UizaSubscriptionTableComponent {
  @Input() source = []
  @Input() setting = ''
  @Output() onChoseSubscription = new EventEmitter()
  maxLength
  constructor() {
    console.log('load Uiza Subscription Table Component');
    this.maxLength = this.getMaxFeatures(this.source)
  }

  async ngOnInit() {
  }

  /**
   *
   */
  style
  getStyle() {
    let length: any;
    if (this.source && this.source.length > 0) {
      this.source.forEach((item) => {
        this.style = item.features && item.features.length * 68.83
      })
    }
    return this.style + 'px';
  }
  // Dom disable hover effect for more User X
  // mouseLeave(e) {
  //   e.target.classList.remove('hover-plan');
  // }


  // mouseEnter(e) {
  //   e.target.classList.add('hover-plan');
  // }


  getMaxFeatures = (listSubscription): number => {
    let maxlength = 0
    if (!listSubscription || !(listSubscription.length > 0)) {
      return 0
    } else {
      listSubscription.forEach(item => {
        if (item.features && item.features.length > maxlength) {
          maxlength = item.features.length
        }
      })
      return maxlength
    }
  }

  choseSubscription = (subscriptionID) => {
    console.log("Event when click on subcription : ", subscriptionID)
    this.onChoseSubscription.emit(subscriptionID)
  }
}
