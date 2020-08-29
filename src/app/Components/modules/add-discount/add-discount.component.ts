import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/services/session/session.service';
import { ItemService } from 'src/app/services/Item/item.service';
import { ProviderInfo } from '../../../Entity/providerInfo';
import { DiscountService } from 'src/app/Services/discount/discount.service';
import { AddDiscountDto } from 'src/app/Entity/addDiscountDto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-discount',
  templateUrl: './add-discount.component.html',
  styleUrls: ['./add-discount.component.scss']
})
export class AddDiscountComponent implements OnInit {

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

  providerTypeList = [
    { name: 'Resturent', value: 1 },
    { name: 'Hotel', value: 2 },
  ];

  constructor(
    private session:SessionService,
    private ItemService: ItemService,
    private DiscountService: DiscountService,
    private router: Router
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

    this.onProviderSelect();
  }

  onSubmit(){
    this.addDiscountDto.assignedBy = this.assignedBy;
    this.addDiscountDto.itemId = Number(this.addDiscountForm.value.itemId);
    this.addDiscountDto.percentageOff = this.addDiscountForm.value.percentage;
    this.addDiscountDto.startDate = this.addDiscountForm.value.startDate;
    this.addDiscountDto.endDate = this.addDiscountForm.value.endDate;
    this.addDiscountDto.createdBy = Number(localStorage.getItem('serviceUserTypeId'));
    this.addDiscountDto.providerId = Number(this.getProviderId);

    console.log(this.addDiscountDto);

    this.DiscountService.addDiscount(this.addDiscountDto).subscribe((res) =>{
      console.log(res);
      this.addDiscountForm.reset();
      this.router.navigateByUrl('/discount');
    });
  }

  onClear(){
    this.addDiscountForm.reset();
  }

  onProviderSelect() {
    this.ItemService.getProviders().subscribe((res) => {
      this.provider = res.data;
      console.log(this.provider);
      
    });
  }

  onProviderTypeSelect(value){
    this.DiscountService.getItemByProviderId(value).subscribe((res) =>{
      console.log(res);

      this.items = res.data;

      this.getProviderId = value;

      console.log(this.items);
    })
  }



}
