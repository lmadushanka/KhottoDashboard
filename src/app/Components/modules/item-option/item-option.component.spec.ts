import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemOptionComponent } from './item-option.component';

describe('ItemOptionComponent', () => {
  let component: ItemOptionComponent;
  let fixture: ComponentFixture<ItemOptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemOptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
