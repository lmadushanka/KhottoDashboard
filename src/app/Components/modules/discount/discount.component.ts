import { Component, OnInit } from '@angular/core';
import { DiscountService } from 'src/app/Services/discount/discount.service';
import { SessionService } from 'src/app/services/session/session.service';
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
  deleteElement: any = { name: '', itemTypeId: 0 };

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
      console.log(res);

      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    })
  }

}
