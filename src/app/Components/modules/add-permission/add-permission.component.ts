import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/Services/session/session.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ResourceService } from 'src/app/Services/resource/resource.service';
import { UserService } from 'src/app/Services/user/user.service';
import { AddPermissionDto } from 'src/app/Entity/addPermissionDto';
import { PermissionService } from 'src/app/Services/permission/permission.service';

@Component({
  selector: 'app-add-permission',
  templateUrl: './add-permission.component.html',
  styleUrls: ['./add-permission.component.scss']
})
export class AddPermissionComponent implements OnInit {
  resourceIdList = [];

  // newCategory: Category = new Category();
  // addCategoryDto: AddCategoryDto = new AddCategoryDto();
  // categoryDto: CategoryDto = new CategoryDto();
   newPermission: AddPermissionDto = new AddPermissionDto();

  //For Images
  public imagePathCover;
  imgURLCover: any;
  coverIf: boolean = false;

  addPermissionForm = new FormGroup({
    resourceId: new FormControl(),
    access: new FormControl(),
    precedenceLevel: new FormControl(),
    resourceOrder: new FormControl(),
    serviceUserTypeId: new FormControl()
  });

  coverFile: File = null;

  parentResource = []

  access = [
    { accessName: 'Yes', value: 1 },
    { accessName: 'No', value: 0 },
  ];

  serviceUserId:any;

  serviceUserTypeList = [];

  constructor(
    private session: SessionService,
    private router: Router,
    private resourceService: ResourceService,
    private userService: UserService,
    private permissionService: PermissionService,
    ) { }

  ngOnInit(): void {
    this.onGetAllResourceId();

    this.serviceUserId = localStorage.getItem('serviceUserId');
    this.getUserType(this.serviceUserId);
  }

  onSubmit(){
    this.newPermission.serviceUserTypeId = Number(this.addPermissionForm.value.serviceUserTypeId);
    this.newPermission.resourceId = Number(this.addPermissionForm.value.resourceId);
    this.newPermission.access = Number(this.addPermissionForm.value.access);
    this.newPermission.serviceUserId = Number(this.serviceUserId);

    console.log(this.newPermission);

    this.permissionService.addNewPermission(this.newPermission).subscribe((res) =>{
      console.log(res);
    })
  }

  onGetAllResourceId(){
    this.resourceService.getAllResourceName().subscribe((res) =>{
      console.log(res.data);
      this.resourceIdList = res.data;
    })
  }

  getUserType(value){
    this.userService.getServiceUserType(value).subscribe((res) =>{
      console.log(res);
      this.serviceUserTypeList = res.data;
      
    })
  }
}
