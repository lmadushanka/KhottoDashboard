import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewItemOptionComponent } from './view-item-option.component';

describe('ViewItemOptionComponent', () => {
  let component: ViewItemOptionComponent;
  let fixture: ComponentFixture<ViewItemOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewItemOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewItemOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
