import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/Services/session/session.service';
import { AddUserDto } from 'src/app/Entity/addUserDto';
import { UserService } from 'src/app/Services/user/user.service';
import { ItemService } from 'src/app/Services/Item/item.service';
import { ProviderInfo } from '../../../Entity/providerInfo';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {

  addUserDto:AddUserDto = new AddUserDto();

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
    serviceUserTypeName: ''
  };

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
    this.providerId = localStorage.getItem('providerId');

    if (this.providerId == 0) {
      this.providerType = true;
    } else if (this.providerId !== 0) {
      this.providerType = false;
    }

    this.userService.getUserByServiceUserId(localStorage.getItem('viewEditUserId')).subscribe((res) =>{
      console.log(res);

      this.userDetails = res.data;
    });
  }


}