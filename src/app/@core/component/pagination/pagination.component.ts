import { Component, ContentChild, ElementRef, AfterContentInit, Input } from '@angular/core';

@Component({
  selector: 'app-uiza-pagination',
  styleUrls: ['./pagination.component.scss'],
  templateUrl: './pagination.component.html',
})


export class UizaPaginationComponent {
  @Input() paging:any;
  onChange(data) {
    this.paging.limit = parseInt(data.limit)
    this.paging.page = parseInt(data.page)
    this.paging.onChange({ limit: this.paging.limit, page: this.paging.page })
  }
}
