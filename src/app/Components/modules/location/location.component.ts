import { Component, OnInit, Provider } from '@angular/core';
import { ResourceService } from 'src/app/Services/resource/resource.service';
import { SessionService } from 'src/app/Services/session/session.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ProviderService } from 'src/app/Services/provider/provider.service';
import { LocationDto } from 'src/app/Entity/locationDto';
import { LocationService } from 'src/app/Services/location/location.service';

export interface ResourceElement {
  locationId: number;
  locationName: any;
  districtId: any;
  activeArea:any;
}

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {

  ELEMENT_DATA: ResourceElement[] = [];
  deleteElement: any = { name: '', promotionId: 0 };

  districts:any;

  setNewLocation: LocationDto = new LocationDto();


  filterLocationForm = new FormGroup({
    districtId: new FormControl(),
  });

  constructor(
    private resourceService: ResourceService,
    private session: SessionService,
    private providerService: ProviderService,
    private locationService: LocationService,
    ) { }

  ngOnInit(): void {

    this.getAllDistrict();

    this.setNewLocation.districtId = null;
    this.setNewLocation.pageNumber = 1;

    this.getDefaultLocation(this.setNewLocation);

  }

  displayedColumns: string[] = ['locationId','locationName', 'districtId','activeArea'];
  dataSource = this.ELEMENT_DATA;

  onSubmit(){

    this.setNewLocation.districtId = Number(this.filterLocationForm.value.districtId);
    this.setNewLocation.pageNumber = 1;

    console.log(this.setNewLocation);

    this.locationService.getAllLocation(this.setNewLocation).subscribe((res) =>{
      console.log(res);

      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    })


  }

  getDefaultLocation(value){
    this.locationService.getAllLocation(value).subscribe((res) =>{
      console.log(res);

      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

    })
  }

  onClear(){

  }

  getAllDistrict(){
    this.providerService.getAllDistricts().subscribe((res) => {
      this.districts = res.data;

      console.log(res);
    })
  }


}
