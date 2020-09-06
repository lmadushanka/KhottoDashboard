import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FacilityService } from 'src/app/Services/facility/facility.service';
import { FacilityComponent } from '../facility/facility.component';
import { Router } from '@angular/router';
import { FacilityTypeDto } from 'src/app/Entity/facilityTypeDto';

@Component({
  selector: 'app-add-facility',
  templateUrl: './add-facility.component.html',
  styleUrls: ['./add-facility.component.scss']
})
export class AddFacilityComponent implements OnInit {

  newFacilityType: FacilityTypeDto = new FacilityTypeDto();

  facilityName:any;

  addFacilityForm = new FormGroup({
    facilityName: new FormControl(),
  });

  constructor(
    private facilityService: FacilityService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.newFacilityType.facilityName = this.addFacilityForm.value.facilityName;
    this.facilityService.addFacility(this.newFacilityType).subscribe((res) =>{
      console.log(res);
      this.router.navigateByUrl('/facility');
    })
  }

  onClear(){

  }

}
