import { Component, OnInit } from '@angular/core';
import { FacilityService } from 'src/app/Services/facility/facility.service';
import { GetMyFacilityDto } from 'src/app/Entity/getMyFacilityDto';
export interface CategoryElement {
  ID: number;
  facilityName: string;
  view: string;
  edit: string;
  delete: string;
}


@Component({
  selector: 'app-my-facility',
  templateUrl: './my-facility.component.html',
  styleUrls: ['./my-facility.component.scss']
})
export class MyFacilityComponent implements OnInit {

  ELEMENT_DATA: CategoryElement[] = [];
  deleteElement: any = { facilityTypeName: '', bookableFacilityId: 0 };

  getMyFacility: GetMyFacilityDto = new GetMyFacilityDto();

  constructor( 
    private facilityService: FacilityService,
  ) { }

  ngOnInit(): void {

    this.getMyFacility.pageNumber = 1;
    if(Number(localStorage.getItem('providerId')) == 0){
      this.getMyFacility.providerId = null;
    }else if(Number(localStorage.getItem('providerId')) !== 0){
      this.getMyFacility.providerId = Number(localStorage.getItem('providerId'));
    }

    console.log(this.getMyFacility)

    this.onGetMyFacility(this.getMyFacility);
  }

  displayedColumns: string[] = ['ID','facilityName','view','edit','delete'];
  dataSource = this.ELEMENT_DATA;

  onGetMyFacility(value){
    this.facilityService.getMyFacility(value).subscribe((res) =>{
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    })
  }

  onDeleteMyFacility(value){
    this.deleteElement = value;
  }

  deleteMyFacility(){
    this.facilityService.onDeleteMyFacility(Number(this.deleteElement.bookableFacilityId)).subscribe((res) =>{
      console.log(res);

      this.getMyFacility.pageNumber = 1;
      if(Number(localStorage.getItem('providerId')) == 0){
        this.getMyFacility.providerId = null;
      }else if(Number(localStorage.getItem('providerId')) !== 0){
        this.getMyFacility.providerId = Number(localStorage.getItem('providerId'));
      }

      console.log(this.getMyFacility)

      this.onGetMyFacility(this.getMyFacility);

    });
  }

}
