import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDiscountComponent } from './view-discount.component';

describe('ViewDiscountComponent', () => {
  let component: ViewDiscountComponent;
  let fixture: ComponentFixture<ViewDiscountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewDiscountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewDiscountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
