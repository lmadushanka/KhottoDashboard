import { Component, OnInit } from '@angular/core';
import { ResourceService } from 'src/app/Services/resource/resource.service';
import { SessionService } from 'src/app/Services/session/session.service';
import { PermissionService } from 'src/app/Services/permission/permission.service'
import { PageNumber } from 'src/app/Entity/pageNumber';

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

  nextCount: number = 1;

  access:string = '';


  constructor(
    private resourceService: ResourceService,
    private session: SessionService,
    private permissionService: PermissionService,
    ) { }

  ngOnInit(): void {

    this.pageNumber.pageNumber = this.nextCount;

    this.onGetAllPermission(this.pageNumber);
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

}
