import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/Services/session/session.service';
import { UpdateUserDto } from 'src/app/Entity/updateUserDto';
import { UserService } from 'src/app/Services/user/user.service';
import { ItemService } from 'src/app/Services/Item/item.service';
import { ProviderInfo } from '../../../Entity/providerInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  addUserDto:UpdateUserDto = new UpdateUserDto();

  serviceUserId:any;

  addUserForm = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    mobileNo: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    serviceUserTypeId: new FormControl(),
    provider: new FormControl()
  });

  userDetails:any = {
    firstName: '',
    lastName: '',
    email: '',
    mobileNo: '',
    serviceUserTypeName: '',
    serviceUserTypeId: '',
    providerId: ''
  };

  serviceUserTypeList = [];

  providerId: any;
  providerType: any;
  provider: ProviderInfo;

  constructor(
    private session: SessionService,
    private userService: UserService,
    private ItemService: ItemService,
    private router: Router,
    
    ) { }


  ngOnInit(): void {
    this.session.sessionCheck();
    this.serviceUserId = localStorage.getItem('serviceUserId');
    this.providerId = localStorage.getItem('providerId');
    this.getUserType(this.serviceUserId);

    console.log(this.serviceUserId)

    if (this.providerId == 0) {
      this.providerType = true;
    } else if (this.providerId !== 0) {
      this.providerType = false;
    }
    // this.onProviderSelect();

    this.userService.getUserByServiceUserId(localStorage.getItem('viewEditUserId')).subscribe((res) =>{
      console.log(res);

      this.userDetails = res.data;
    });
  }

  onSubmit(){

    

    var _this = this;

    this.addUserDto.firstName = this.addUserForm.value.firstName;
    this.addUserDto.lastName = this.addUserForm.value.lastName;
    this.addUserDto.mobileNo = this.addUserForm.value.mobileNo;
    this.addUserDto.email = this.addUserForm.value.email;
    this.addUserDto.serviceUserTypeId = Number(this.addUserForm.value.serviceUserTypeId);

    this.addUserDto.providerId = this.userDetails.providerId;
    

    

    if(this.addUserDto.firstName == null){
      this.addUserDto.firstName = this.userDetails.firstName;
    }

    if(this.addUserDto.lastName == null){
      this.addUserDto.lastName = this.userDetails.lastName;
    }

    if(this.addUserDto.email == null){
      this.addUserDto.email = this.userDetails.email;
    }

    if(this.addUserDto.mobileNo == null){
      this.addUserDto.mobileNo = this.userDetails.mobileNo;
    }

    if(this.addUserDto.serviceUserTypeId == 0){
      this.addUserDto.serviceUserTypeId = this.userDetails.serviceUserTypeId;
    }

    console.log(this.addUserDto);

    this.userService.updateUser(Number(localStorage.getItem('viewEditUserId')),this.addUserDto).subscribe((res) =>{
      console.log(res);
      this.router.navigateByUrl('/users');
    });

  }

  getUserType(value){
    this.userService.getServiceUserType(value).subscribe((res) =>{
      console.log(res);
      this.serviceUserTypeList = res.data;
    })
  }

  // onProviderSelect() {
  //   this.ItemService.getProviders().subscribe((res) => {
  //     this.provider = res.data;
  //     // console.log(this.provider);
  //   });
  // }

}
