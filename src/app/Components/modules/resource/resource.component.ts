import { Component, OnInit } from '@angular/core';
import { ResourceService } from 'src/app/Services/resource/resource.service';
import { SessionService } from 'src/app/services/session/session.service';

export interface ResourceElement {
  resourceId: number;
  resourceName: string;
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

  providerTypeList = [
    { name: 'Resturent', value: 1 },
    { name: 'Hotel', value: 2 },
  ];

  constructor(
    private resourceService: ResourceService,
    private session: SessionService,
    ) { }

  ngOnInit(): void {
    this.onGetAllResources();
  }

  displayedColumns: string[] = ['resourceId', 'resourceName','view','edit','delete'];
  dataSource = this.ELEMENT_DATA;

  onGetAllResources(){
    this.resourceService.getResource().subscribe((res) =>{
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      // console.log(this.dataSource);
    })
  }

}
