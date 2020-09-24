import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/Services/session/session.service';
import { FilterSmsDto } from 'src/app/Entity/filterUserSmsDto';
import { SmsService } from 'src/app/Services/sms/sms.service';

export interface PeriodicElement {
  checkUserId: number;
  clientUserId: number;
  clientName: string;
  mobile: any;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-sms',
  templateUrl: './sms.component.html',
  styleUrls: ['./sms.component.scss']
})
export class SmsComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] = [];

  filterUser = new FormGroup({
    minDate: new FormControl(),
    maxDate: new FormControl(),
  });

  serviceUserId:any;

  setFilterUser: FilterSmsDto = new FilterSmsDto();


  serviceUserTypeList = [];

  constructor(
    private session: SessionService,
    private userService: UserService,
    private smsService: SmsService,
    ) { }

    displayedColumns: string[] = [
      'checkUserId',
      'clientUserId',
      'clientName',
      'mobile'
    ];

    dataSource = ELEMENT_DATA;

  ngOnInit(): void {

    this.setFilterUser.date.min = this.filterUser.value.minDate;
    this.setFilterUser.date.max = this.filterUser.value.maxDate;
    this.setFilterUser.pageNumber = 1;

    console.log(this.setFilterUser);

    this.smsService.getFilterUser(this.setFilterUser).subscribe((res) =>{
      console.log(res);

      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    })

  }

  onSubmit(){

    this.setFilterUser.date.min = this.filterUser.value.minDate;
    this.setFilterUser.date.max = this.filterUser.value.maxDate;
    this.setFilterUser.pageNumber = 1;

    console.log(this.setFilterUser);

    this.smsService.getFilterUser(this.setFilterUser).subscribe((res) =>{
      console.log(res);

      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    })

  }

  onClear(){
    this.filterUser.reset();

    this.setFilterUser.date.min = null;
    this.setFilterUser.date.max = null;
    this.setFilterUser.pageNumber = 1;

    this.smsService.getFilterUser(this.setFilterUser).subscribe((res) =>{
      console.log(res);

      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    })
  }

}
