import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/Services/session/session.service';
import { FilterSmsDto } from 'src/app/Entity/filterUserSmsDto';
import { SmsService } from 'src/app/Services/sms/sms.service';
import { EmailDto } from 'src/app/Entity/emailDto';
import { SendEmailDto } from 'src/app/Entity/sendEmailDto';

export interface PeriodicElement {
  checkUserId: number;
  clientUserId: number;
  clientName: string;
  email: any;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] = [];

  filterUser = new FormGroup({
    minDate: new FormControl(),
    maxDate: new FormControl(),
  });

  serviceUserId:any;

  setFilterUser: FilterSmsDto = new FilterSmsDto();

  sendEmailDto: SendEmailDto = new SendEmailDto();

  setClientList: EmailDto[];


  isChecked = false;

  userList:any;

  


  serviceUserTypeList = [];

  emailArray: EmailDto[] = [];

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
      emailBody: new FormControl(),
      emailSubject: new FormControl()

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

      this.emailArray.push({
        clientUserId: value1,
        email: value2
      });

    this.setClientList = this.emailArray;

    this.sendEmailDto.recipients = this.setClientList;

    // let smsArrayLenght = this.sendSmsDto.recipients.length;
    
    // console.log(smsArrayLenght-1)

    // let i = smsArrayLenght-2;

    // if(i > 0 ){
    //   if(this.sendSmsDto.recipients[i].clientUserId == value1){
    //     console.log(this.sendSmsDto.recipients.findIndex(this.sendSmsDto.recipients[i].clientUserId))
    //   }
    // }


    
      
      

      console.log(this.sendEmailDto);
  }

  onSendSMS(){
    this.sendEmailDto.emailBody = this.addSms.value.emailBody;
    this.sendEmailDto.serviceUserId = localStorage.getItem('serviceUserId');
    this.sendEmailDto.emailSubject = this.addSms.value.emailSubject

    console.log(this.sendEmailDto);

    if(this.addSms.value.emailBody == null){
    }else{
      this.smsService.sendEmail(this.sendEmailDto).subscribe((res)=>{
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
        this.emailArray.push({
          clientUserId: this.userList[i].clientUserId,
          email:String(this.userList[i].mobileNo)
        });
      }

      

      this.setClientList = this.emailArray

      this.sendEmailDto.recipients = this.setClientList;

      console.log(this.sendEmailDto);

    }else if(this.isChecked == true){
      this.isChecked = false;

      for(let i = 0; i < this.userList.length; i++){
        this.sendEmailDto.recipients.splice(i,1);
        // console.log(i);
      }
      
      console.log(this.sendEmailDto);
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

