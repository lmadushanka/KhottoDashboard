import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditItemOptionComponent } from './edit-item-option.component';

describe('EditItemOptionComponent', () => {
  let component: EditItemOptionComponent;
  let fixture: ComponentFixture<EditItemOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditItemOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditItemOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
