import { Component, OnInit } from '@angular/core';
import { FacilityService } from 'src/app/Services/facility/facility.service';
export interface CategoryElement {
  ID: number;
  facilityName: string;
  view: string;
  edit: string;
  delete: string;
}

@Component({
  selector: 'app-facility',
  templateUrl: './facility.component.html',
  styleUrls: ['./facility.component.scss']
})
export class FacilityComponent implements OnInit {
  ELEMENT_DATA: CategoryElement[] = [];
  deleteElement: any = { name: '', itemTypeId: 0 };

  constructor( 
    private facilityService: FacilityService,
  ) { }

  ngOnInit(): void {

    this.onGetAllFacility();
  }

  displayedColumns: string[] = ['ID','facilityName','view','edit','delete'];
  dataSource = this.ELEMENT_DATA;

  onGetAllFacility(){
    this.facilityService.getAllFacility().subscribe((res) =>{
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    })
  }

}
