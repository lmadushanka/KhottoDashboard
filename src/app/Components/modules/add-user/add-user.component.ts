import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/Services/session/session.service';
import { AddUserDto } from 'src/app/Entity/addUserDto';
import { UserService } from 'src/app/Services/user/user.service';
import { ItemService } from 'src/app/Services/Item/item.service';
import { ProviderInfo } from '../../../Entity/providerInfo';
import { Router } from '@angular/router';

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
    provider: new FormControl()
  });

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
    this.onProviderSelect();
  }

  onSubmit(){

    

    var _this = this;

    this.addUserDto.firstName = this.addUserForm.value.firstName;
    this.addUserDto.lastName = this.addUserForm.value.lastName;
    this.addUserDto.mobileNo = this.addUserForm.value.mobileNo;
    this.addUserDto.email = this.addUserForm.value.email;
    this.addUserDto.password = this.addUserForm.value.password;
    this.addUserDto.serviceUserTypeId = Number(this.addUserForm.value.serviceUserTypeId);

    if (this.providerId == 0) {
      this.addUserDto.providerId = Number(this.addUserForm.value.provider);
    } else if (this.providerId !== 0) {
      this.addUserDto.providerId = Number(this.providerId);
    }

    console.log(this.addUserDto);

    this.userService.addUser(this.addUserDto).subscribe((res) =>{
      console.log(res);

      this.addUserForm.reset();
      this.router.navigateByUrl('/users')
    });
  }

  getUserType(value){
    this.userService.getServiceUserType(value).subscribe((res) =>{
      console.log(res);
      this.serviceUserTypeList = res.data;
    })
  }

  onProviderSelect() {
    this.ItemService.getProviders().subscribe((res) => {
      this.provider = res.data;
      // console.log(this.provider);
    });
  }

}
