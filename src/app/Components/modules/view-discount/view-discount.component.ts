import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/Services/session/session.service';
import { ItemService } from 'src/app/Services/Item/item.service';
import { ProviderInfo } from '../../../Entity/providerInfo';
import { DiscountService } from 'src/app/Services/discount/discount.service';
import { AddDiscountDto } from 'src/app/Entity/addDiscountDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-discount',
  templateUrl: './view-discount.component.html',
  styleUrls: ['./view-discount.component.scss']
})
export class ViewDiscountComponent implements OnInit {

  addDiscountDto: AddDiscountDto = new AddDiscountDto();

  providerId: any;
  providerType: any;
  provider: ProviderInfo;
  items: any;
  assignedBy = 0;
  getProviderId:any;

  addDiscountForm = new FormGroup({
    providerTypeId:new FormControl(),
    itemId: new FormControl(),
    percentage: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
  });

  coverFile: File = null;

  discountDetails: any ={
    providerName: '',
    providerId: '',
    itemName: '',
    itemId: '',
    percentageOff: '',
    startDate: '',
    endDate: '',
  }

  constructor(
    private session:SessionService,
    private ItemService: ItemService,
    private DiscountService: DiscountService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.session.sessionCheck();
    this.providerId = localStorage.getItem('providerId');

    if (this.providerId == 0) {
      this.providerType = true;
    } else if (this.providerId !== 0) {
      this.providerType = false;
      this.assignedBy = Number(localStorage.getItem('providerId'));
    }

    this.onGetDiscountByDiscountId(localStorage.getItem('discountId'));

    // this.onProviderSelect();
  }


  onGetDiscountByDiscountId(value){
    this.DiscountService.getDiscountByDiscountId(value).subscribe((res) =>{
      console.log(res);

      this.discountDetails = res.data;

      console.log(this.discountDetails);
    });
  }

  
}