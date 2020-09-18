import { Component, OnInit } from '@angular/core';
import { ResourceService } from 'src/app/Services/resource/resource.service';
import { SessionService } from 'src/app/Services/session/session.service';

export interface ResourceElement {
  resourceId: number;
  resourceName: string;
  routePath: string;
  view: string;
  edit: string;
  delete: string;
}

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.scss']
})
export class ResourceComponent implements OnInit {

  ELEMENT_DATA: ResourceElement[] = [];
  deleteElement: any = { name: '', itemTypeId: 0 };

  nextCount: number = 1;

  providerTypeList = [
    { name: 'Resturent', value: 1 },
    { name: 'Hotel', value: 2 },
  ];

  constructor(
    private resourceService: ResourceService,
    private session: SessionService,
    ) { }

  ngOnInit(): void {
    this.onGetAllResources(this.nextCount);
  }

  displayedColumns: string[] = ['resourceId', 'resourceName','routePath','view','edit','delete'];
  dataSource = this.ELEMENT_DATA;

  onGetAllResources(value){
    this.resourceService.getResource(value).subscribe((res) =>{
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    })
  }

  onPreviewButton(){

    let i = 0;

    i--;

    if (this.nextCount != 1) {
      this.nextCount += i;
      // console.log(this.nextCount);
    }

    this.resourceService.getResource(this.nextCount).subscribe((res) =>{
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    })

  }

  onNextButton(){
    let i = 0;

    i++;

    this.nextCount += i;

    this.resourceService.getResource(this.nextCount).subscribe((res) =>{
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    })
  }

}
