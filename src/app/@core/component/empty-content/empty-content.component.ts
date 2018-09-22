import {Component, ContentChild, ElementRef, AfterContentInit, Input} from '@angular/core';

@Component({
  selector: 'app-uiza-empty-content',
  styleUrls: ['./empty-content.component.scss'],
  templateUrl: './empty-content.component.html',
})

export class UizaEmptyContentComponent implements AfterContentInit {
  @Input() settings:any={
    icon :'icon-noreview',
    createNew : true,
    createNewTitle:"Create New",
    textEmpty : "You haven't created task any customers yet.",
    createNewFunction: ()=>{
      console.log('click')
    }
  };
 

  ngAfterContentInit() {

  }
}
