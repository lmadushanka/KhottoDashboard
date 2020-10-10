import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/Services/session/session.service';
import { FilterSmsDto } from 'src/app/Entity/filterUserSmsDto';
import { SmsService } from 'src/app/Services/sms/sms.service';
import { SmsDto } from 'src/app/Entity/smsDto';
import { SendSmsDto } from 'src/app/Entity/sendSmsDto';

export interface PeriodicElement {
  smsText: string;
  sendProcessStartAt: string;
  sendProcessFinishedAt: any;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-sms-report',
  templateUrl: './sms-report.component.html',
  styleUrls: ['./sms-report.component.scss']
})
export class SmsReportComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] = [];

  filterUser = new FormGroup({
    minDate: new FormControl(),
    maxDate: new FormControl(),
  });

  serviceUserId:any;

  setFilterUser: FilterSmsDto = new FilterSmsDto();

  sendSmsDto: SendSmsDto = new SendSmsDto();

  setClientList: SmsDto[];


  isChecked = false;

  userList:any;

  


  serviceUserTypeList = [];

  smsArray: SmsDto[] = [];

  nextCount:any;

  constructor(
    private session: SessionService,
    private userService: UserService,
    private smsService: SmsService,
    ) { }

    displayedColumns: string[] = [
      'smsText',
      'sendProcessStartAt',
      'sendProcessFinishedAt'
    ];

    dataSource = ELEMENT_DATA;

    addSms = new FormGroup({
      smsText: new FormControl(),

    })

  ngOnInit(): void {
    this.nextCount = 1;

    this.setFilterUser.date.min = this.filterUser.value.minDate;
    this.setFilterUser.date.max = this.filterUser.value.maxDate;
    this.setFilterUser.pageNumber = 1;

    console.log(this.setFilterUser);

    this.smsService.getSMSReport(this.setFilterUser).subscribe((res) =>{
      console.log(res);

      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    });

  }

  onSubmit(){

    this.setFilterUser.date.min = this.filterUser.value.minDate;
    this.setFilterUser.date.max = this.filterUser.value.maxDate;
    this.setFilterUser.pageNumber = 1;

    console.log(this.setFilterUser);

    this.smsService.getSMSReport(this.setFilterUser).subscribe((res) =>{
      console.log(res);

      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    });

  }

  onClear(){
    this.filterUser.reset();

    this.setFilterUser.date.min = null;
    this.setFilterUser.date.max = null;
    this.setFilterUser.pageNumber = 1;

    this.smsService.getSMSReport(this.setFilterUser).subscribe((res) =>{
      console.log(res);

      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    });
  }

  onPreviewButton(){

    let i = 0;

    i--;

    if (this.nextCount != 1) {
      this.nextCount += i;
      // console.log(this.nextCount);
    }

    this.setFilterUser.date.min = this.filterUser.value.minDate;
    this.setFilterUser.date.max = this.filterUser.value.maxDate;
    this.setFilterUser.pageNumber = this.nextCount;

    console.log(this.setFilterUser);

    this.smsService.getSMSReport(this.setFilterUser).subscribe((res) =>{
      console.log(res);

      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    });

  }

  onNextButton(){

    let i = 0;

    i++;

    this.nextCount += i;

    this.setFilterUser.date.min = this.filterUser.value.minDate;
    this.setFilterUser.date.max = this.filterUser.value.maxDate;
    this.setFilterUser.pageNumber = this.nextCount;

    console.log(this.setFilterUser);

    this.smsService.getSMSReport(this.setFilterUser).subscribe((res) =>{
      console.log(res);

      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    });
    
  }

}
