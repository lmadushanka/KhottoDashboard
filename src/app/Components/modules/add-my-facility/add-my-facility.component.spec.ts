import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMyFacilityComponent } from './add-my-facility.component';

describe('AddMyFacilityComponent', () => {
  let component: AddMyFacilityComponent;
  let fixture: ComponentFixture<AddMyFacilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddMyFacilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMyFacilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
