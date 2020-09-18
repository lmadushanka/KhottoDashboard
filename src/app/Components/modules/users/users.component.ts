import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/Services/session/session.service';
import { AddUserDto } from 'src/app/Entity/addUserDto';
import { FilterUserDto } from 'src/app/Entity/filterUserDto';

export interface PeriodicElement {
  fistName: string;
  lastName: string;
  mobile: any;
  email: string;
  view: string;
  edit: string;
  delete: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})


export class UsersComponent implements OnInit {
  ELEMENT_DATA: PeriodicElement[] = [];

  filterUserDto:FilterUserDto = new FilterUserDto();

  filterUser = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    providerName: new FormControl(),
    serviceUserTypeId: new FormControl(),
  });

  serviceUserId:any;

  serviceUserTypeList = [];

  constructor(
    private session: SessionService,
    private userService: UserService,
    ) { }

    displayedColumns: string[] = [
      'firstName',
      'lastName',
      'mobile',
      'email',
      'view',
      'edit',
      'delete',
    ];

    dataSource = ELEMENT_DATA;

  ngOnInit(): void {

    this.filterUserDto.firstNameString = null;
    this.filterUserDto.lastNameString = null;
    this.filterUserDto.providerNameString = null;
    this.filterUserDto.myServiceUserTypeId = this.serviceUserId;
    this.filterUserDto.pageNumber = 1;

    this.session.sessionCheck();
    this.serviceUserId = localStorage.getItem('serviceUserId');
    this.getUserType(this.serviceUserId);

    console.log(this.serviceUserId)

    this.getAllUsers(this.filterUserDto);
  }

  onSubmit(){

    var _this = this;
    let serviceUserId = Number(this.filterUser.value.serviceUserTypeId)

    if(serviceUserId == 0){
      serviceUserId = null;
    }

    this.filterUserDto.serviceUserTypeId = serviceUserId;

    this.filterUserDto.firstNameString = this.filterUser.value.firstName;
    this.filterUserDto.lastNameString = this.filterUser.value.lastName;
    this.filterUserDto.providerNameString = this.filterUser.value.providerName;
    this.filterUserDto.myServiceUserTypeId = this.serviceUserId;
    this.filterUserDto.pageNumber = 1;
    

    console.log(this.filterUserDto);

    this.userService.getAllUsers(this.filterUserDto).subscribe((res) =>{
      console.log(res)

      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      this.filterUser.reset();
    });
  }
  

  getUserType(value){
    this.userService.getServiceUserType(value).subscribe((res) =>{
      console.log(res);
      this.serviceUserTypeList = res.data;
      
    })
  }

  getAllUsers(value){
    this.userService.getAllUsers(this.filterUserDto).subscribe((res) =>{
      console.log(res)

      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    });
  }

}

