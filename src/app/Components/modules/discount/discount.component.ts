import { Component, OnInit } from '@angular/core';
import { DiscountService } from 'src/app/Services/discount/discount.service';
import { SessionService } from 'src/app/Services/session/session.service';
export interface PeriodicElement {
  itemName: string;
  providerName: string;
  percentage: number;
  startDate: string;
  endDate:string;
  view: string;
  edit: string;
  delete: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.scss']
})
export class DiscountComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] = [];
  deleteElement: any = { discountId: 0, providerName: '', itemName: ''};

  serviceUserId:any ={serviceUserId: 0};

  nextCount: number = 1;

  constructor(
    private discountService:DiscountService,
    private sessionService:SessionService
  ) { }

  ngOnInit(): void {
    this.getAllDiscount();
  }

  displayedColumns: string[] = [
    'itemName',
    'providerName',
    'percentage',
    'startDate',
    'endDate',
    'view',
    'edit',
    'delete',
  ];
  dataSource = ELEMENT_DATA;

  getAllDiscount(){
    this.discountService.getAllDiscount().subscribe((res) =>{
      console.log(res.data);

      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    })
  }

  setExpireDiscount(value){
    console.log(value);
    this.deleteElement.discountId = value.discountId;
    this.deleteElement.itemName = value.itemName;
    this.deleteElement.providerName = value.providerName;
  }

  setDeleteDiscount(){
    this.serviceUserId.serviceUserId =  Number(localStorage.getItem('serviceUserId'));

    console.log(this.serviceUserId);

    this.discountService.setExpireDiscount(this.deleteElement.discountId , this.serviceUserId).subscribe((res) =>{
      console.log(res);
    });
  }

}
