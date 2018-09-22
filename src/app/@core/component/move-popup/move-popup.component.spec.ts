import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovePopupComponent } from './move-popup.component';

describe('MovePopupComponent', () => {
  let component: MovePopupComponent;
  let fixture: ComponentFixture<MovePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
