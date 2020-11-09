import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItemOptionComponent } from './add-item-option.component';

describe('AddItemOptionComponent', () => {
  let component: AddItemOptionComponent;
  let fixture: ComponentFixture<AddItemOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddItemOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddItemOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
