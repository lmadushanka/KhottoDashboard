import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/Services/session/session.service';
import { FilterSmsDto } from 'src/app/Entity/filterUserSmsDto';
import { SmsService } from 'src/app/Services/sms/sms.service';
import { SmsDto } from 'src/app/Entity/smsDto';
import { SendSmsDto } from 'src/app/Entity/sendSmsDto';

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
      'checkUserId',
      'clientUserId',
      'clientName',
      'mobile'
    ];

    dataSource = ELEMENT_DATA;

    addSms = new FormGroup({
      smsText: new FormControl(),

    })

  ngOnInit(): void {

    this.nextCount = 1;

    this.setFilterUser.date.min = this.filterUser.value.minDate;
    this.setFilterUser.date.max = this.filterUser.value.maxDate;
    this.setFilterUser.pageNumber = this.nextCount;

    console.log(this.setFilterUser);

    this.smsService.getFilterUser(this.setFilterUser).subscribe((res) =>{
      console.log(res);

      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      this.userList = res.data;
    });

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

  onCheckBox(value1,value2){

      this.smsArray.push({
        clientUserId: value1,
        mobileNo:Number(value2)
      });

    this.setClientList = this.smsArray;

    this.sendSmsDto.recipients = this.setClientList;

    // let smsArrayLenght = this.sendSmsDto.recipients.length;
    
    // console.log(smsArrayLenght-1)

    // let i = smsArrayLenght-2;

    // if(i > 0 ){
    //   if(this.sendSmsDto.recipients[i].clientUserId == value1){
    //     console.log(this.sendSmsDto.recipients.findIndex(this.sendSmsDto.recipients[i].clientUserId))
    //   }
    // }


    
      
      

      console.log(this.sendSmsDto);
  }

  onSendSMS(){
    this.sendSmsDto.smsText = this.addSms.value.smsText;
    this.sendSmsDto.serviceUserId = localStorage.getItem('serviceUserId');

    console.log(this.sendSmsDto);

    if(this.addSms.value.smsText == null){
    }else{
      this.smsService.addSMS(this.sendSmsDto).subscribe((res)=>{
        console.log(res);
  
        this.onClear();

        this.addSms.reset();
      })
    }
    
  }

  onSelectAllCheckBox(){
    if(this.isChecked == false){
      this.isChecked = true

      for(let i = 0; i < this.userList.length; i++){
        this.smsArray.push({
          clientUserId: this.userList[i].clientUserId,
          mobileNo:Number(this.userList[i].mobileNo)
        });
      }

      

      this.setClientList = this.smsArray

      this.sendSmsDto.recipients = this.setClientList;

      console.log(this.sendSmsDto);

    }else if(this.isChecked == true){
      this.isChecked = false;

      for(let i = 0; i < this.userList.length; i++){
        this.sendSmsDto.recipients.splice(i,1);
        // console.log(i);
      }
      
      console.log(this.sendSmsDto);
    }
    
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

    this.smsService.getFilterUser(this.setFilterUser).subscribe((res) =>{
      console.log(res);

      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      this.userList = res.data;
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

    this.smsService.getFilterUser(this.setFilterUser).subscribe((res) =>{
      console.log(res);

      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      this.userList = res.data;
    });
    
  }

}
