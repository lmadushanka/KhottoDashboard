import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/Services/location/location.service';
import { ProviderService } from 'src/app/Services/provider/provider.service';
import { AddLocationDto } from 'src/app/Entity/addLocationDto';

@Component({
  selector: 'app-add-location',
  templateUrl: './add-location.component.html',
  styleUrls: ['./add-location.component.scss']
})
export class AddLocationComponent implements OnInit {


  addLocationForm = new FormGroup({
    districtId: new FormControl(),
    locationName: new FormControl(),
    isActive: new FormControl()
  });

  addNewLocation: AddLocationDto = new AddLocationDto();

  districts:any;

  isActive = [
    { title: 'Yes', value: 1 },
    { title: 'No', value: 0 },
  ]

  constructor(
    private router: Router,
    private providerService: ProviderService,
    private locationService: LocationService,
  ) { }

  ngOnInit(): void {

    this.getAllDistrict();

  }

  onSubmit(){

    this.addNewLocation.districtId = Number(this.addLocationForm.value.districtId);
    this.addNewLocation.locationName = this.addLocationForm.value.locationName;
    this.addNewLocation.isActive = Number(this.addLocationForm.value.isActive);

    console.log(this.addNewLocation);

    this.locationService.setNewLocation(this.addNewLocation).subscribe((res) =>{
      console.log(res);

      this.router.navigateByUrl('/location');
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
