import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsReportComponent } from './sms-report.component';

describe('SmsReportComponent', () => {
  let component: SmsReportComponent;
  let fixture: ComponentFixture<SmsReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmsReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
