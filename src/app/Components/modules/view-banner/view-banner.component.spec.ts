import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBannerComponent } from './view-banner.component';

describe('ViewBannerComponent', () => {
  let component: ViewBannerComponent;
  let fixture: ComponentFixture<ViewBannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBannerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
