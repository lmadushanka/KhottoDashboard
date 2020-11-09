import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FacilityService } from 'src/app/Services/facility/facility.service';
import { FacilityComponent } from '../facility/facility.component';
import { Router } from '@angular/router';
import { FacilityTypeDto } from 'src/app/Entity/facilityTypeDto';
import { ItemService } from 'src/app/Services/Item/item.service';
import { ItemOption } from 'src/app/Entity/itemOption';
import { MyFacilityDto } from 'src/app/Entity/myFacilityDto';
import { MyFacilityComponent } from '../my-facility/my-facility.component';
import { AddMyFacilityDto } from 'src/app/Entity/addMyFacilityDto';

@Component({
  selector: 'app-add-my-facility',
  templateUrl: './add-my-facility.component.html',
  styleUrls: ['./add-my-facility.component.scss']
})
export class AddMyFacilityComponent implements OnInit {

  newMyFacilty: AddMyFacilityDto = new AddMyFacilityDto();

  itemOptions: MyFacilityDto[] = [];

  addMyFacilityForm = new FormGroup({
    facilityTypeId: new FormControl(),
  });

  constructor(
    private facilityService: FacilityService,
    private router: Router,
    private itemService: ItemService,
  ) { }

  ngOnInit(): void {

    this.getAllFacility();
  }


  onSubmit() {

    this.newMyFacilty.facilityTypeId = this.addMyFacilityForm.value.facilityTypeId;
    this.newMyFacilty.providerId = Number(localStorage.getItem('providerId'));
    this.newMyFacilty.facilityCount = 1;
    
  
  }

  onClear() {
    this.addMyFacilityForm.reset();

  }

  getAllFacility(){

    this.facilityService.getAllFacility().subscribe((res) =>{
      console.log(res);
      this.itemOptions = res.data;
    });
  }

}
