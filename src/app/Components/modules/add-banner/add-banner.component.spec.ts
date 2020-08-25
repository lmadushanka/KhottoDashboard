import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBannerComponent } from './add-banner.component';

describe('AddBannerComponent', () => {
  let component: AddBannerComponent;
  let fixture: ComponentFixture<AddBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
