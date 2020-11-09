import { Component, OnInit } from '@angular/core';
import { ResourceService } from 'src/app/Services/resource/resource.service';
import { SessionService } from 'src/app/Services/session/session.service';
import { PermissionService } from 'src/app/Services/permission/permission.service'
import { PageNumber } from 'src/app/Entity/pageNumber';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from 'src/app/Services/user/user.service';
import { FilterPermission } from 'src/app/Entity/filterPermissionDto';

export interface ResourceElement {
  resourcePermissionId: number;
  resourceName: any;
  access: string;
  view: string;
  edit: string;
  delete: string;
}

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrls: ['./permission.component.scss']
})
export class PermissionComponent implements OnInit {

  ELEMENT_DATA: ResourceElement[] = [];
  deleteElement: any = { name: '', itemTypeId: 0 };

  pageNumber:PageNumber = new PageNumber();

  filterPermissionDto: FilterPermission = new FilterPermission();

  nextCount: number = 1;

  access:string = '';

  serviceUserTypeList = [];

  filterPermission = new FormGroup({
    serviceUserTypeId: new FormControl(),
  });


  constructor(
    private resourceService: ResourceService,
    private session: SessionService,
    private permissionService: PermissionService,
    private userService: UserService,
    ) { }

  ngOnInit(): void {

    this.pageNumber.pageNumber = this.nextCount;

    this.onGetAllPermission(this.pageNumber);

    this.getUserType(Number(localStorage.getItem('serviceUserId')));
  }

  onSubmit(){

    this.filterPermissionDto.serviceUserTypeId = Number(this.filterPermission.value.serviceUserTypeId);
    this.filterPermissionDto.pageNumber = 1;

    console.log(this.filterPermissionDto);

    this.permissionService.getAllPermission(this.filterPermissionDto).subscribe((res) =>{
      console.log(res.data);
      let data = res.data;
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      this.filterPermission.reset();
    });
  }

  onClear(){
    this.filterPermission.reset();
  }

  displayedColumns: string[] = ['resourcePermissionId', 'access','resourceName','view','edit','delete'];
  dataSource = this.ELEMENT_DATA;

  onGetAllPermission(value){
    this.permissionService.getAllPermission(value).subscribe((res) =>{
      console.log(res.data);
      let data = res.data;
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      // if(res.data.access == 1){
      //   this.access = 'Yes';
      // }else if(res.data.access == 0){
      //   this.access = 'No';
      // }
      
    })
  }

  onPreviewButton(){

    let i = 0;

    i--;

    if (this.nextCount != 1) {
      this.nextCount += i;
      // console.log(this.nextCount);
    }

    this.pageNumber.pageNumber = this.nextCount;

    this.permissionService.getAllPermission(this.pageNumber).subscribe((res) =>{
      console.log(res.data);
      let data = res.data;
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      // if(res.data.access == 1){
      //   this.access = 'Yes';
      // }else if(res.data.access == 0){
      //   this.access = 'No';
      // }
      
    })

  }

  onNextButton(){
    let i = 0;

    i++;

    this.nextCount += i;

    this.pageNumber.pageNumber = this.nextCount;

    this.permissionService.getAllPermission(this.pageNumber).subscribe((res) =>{
      console.log(res.data);
      let data = res.data;
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      // if(res.data.access == 1){
      //   this.access = 'Yes';
      // }else if(res.data.access == 0){
      //   this.access = 'No';
      // }
      
    })
  }
  
  getUserType(value){
    this.userService.getServiceUserType(value).subscribe((res) =>{
      console.log(res);
      this.serviceUserTypeList = res.data;
      
    })
  }

}
