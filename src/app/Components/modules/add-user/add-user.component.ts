import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/services/session/session.service';
import { AddUserDto } from 'src/app/Entity/addUserDto';
import { UserService } from 'src/app/Services/user/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  addUserDto:AddUserDto = new AddUserDto();

  serviceUserId:any;

  addUserForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    mobileNo: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    serviceUserTypeId: new FormControl(),
  });

  serviceUserTypeList = [];

  constructor(
    private session: SessionService,
    private userService: UserService,
    
    ) { }

  ngOnInit(): void {
    this.session.sessionCheck();
    this.serviceUserId = localStorage.getItem('serviceUserId');
    this.getUserType(this.serviceUserId);

    console.log(this.serviceUserId)
  }

  onSubmit(){

    

    var _this = this;

    this.addUserDto.firstName = this.addUserForm.value.firstName;
    this.addUserDto.lastName = this.addUserForm.value.lastName;
    this.addUserDto.mobileNo = this.addUserForm.value.mobileNo;
    this.addUserDto.email = this.addUserForm.value.email;
    this.addUserDto.password = this.addUserForm.value.password;
    this.addUserDto.serviceUserTypeId = Number(this.addUserForm.value.serviceUserTypeId);

    console.log(this.addUserDto);
  }

  getUserType(value){
    this.userService.getServiceUserType(value).subscribe((res) =>{
      console.log(res);
      this.serviceUserTypeList = res.data;
    })
  }

}
