import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ItemService } from 'src/app/Services/Item/item.service';
import { ProviderInfo } from '../../../Entity/providerInfo';
import { SessionService } from 'src/app/Services/session/session.service';
import { FilterOrderDto } from 'src/app/Entity/filterOrderDto';
import { MinMaxDate } from 'src/app/Entity/minMaxDate';
import { MinMaxPrice } from 'src/app/Entity/minMaxPrice';
import { OrderService } from 'src/app/Services/order/order.service';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export interface PeriodicElement {
  orderId: string;
  fullName: string;
  mobile: any;
  email: string;
  orderStatusLabel: string; 
  billRequested:string;
  view: string;
  accept: string;
  rejectOrder: string;
  
}



const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  ELEMENT_DATA: PeriodicElement[] = [];

  rejectElement: any = {orderId: 0 , fullName: ''};
  acceptElement: any = {orderId: 0 , fullName: ''};

  setServiceUser:any = {serviceUserId: ''};

  filterOrderDto: FilterOrderDto = new FilterOrderDto();
  orderId:any;

  subscription: Subscription;
  statusText: string;
  

  filterOrderForm = new FormGroup({
    orderId: new FormControl(),
    mobileNumber: new FormControl(),
    providerId: new FormControl(),
    RequestedOrder: new FormControl(),
    serviceUserTypeId: new FormControl(),
    maxDate: new FormControl(),
    minDate: new FormControl(),
    minPrice: new FormControl(),
    maxPrice: new FormControl()
  });

  minMaxDate: MinMaxDate = new MinMaxDate();
  minMaxPrice: MinMaxPrice = new MinMaxPrice();

  provider: ProviderInfo;
  serviceUserId:number;
  providerId: any;
  providerType: any;

  serviceUserTypeList = [];

  expandingType:any;

  exapndIcon:any;
  

  constructor(
    private itemService : ItemService,
    private session: SessionService,
    private orderService : OrderService,
    private router: Router,
  ) { }

  displayedColumns: string[] = [
    'orderId',
    'fullName',
    'mobile',
    'billTotal',
    'orderStatusLabel',
    'billRequested',
    'view',
    'accept',
    'rejectOrder',
    
  ];

  statustext:any;

  dataSource = ELEMENT_DATA;

  ngOnInit(): void {
    this.session.sessionCheck();

    this.providerId = Number(localStorage.getItem('providerId'));

    this.serviceUserId = Number(localStorage.getItem('serviceUserId'));

    this.filterOrderDto.priceInfo = this.minMaxPrice;
    this.filterOrderDto.dateInfo = this.minMaxDate;
    this.filterOrderDto.providerId = Number(this.providerId);

    this.filterOrderDto.pageNumber = 1;

    console.log(this.filterOrderDto);

    
    this.onProviderSelect();

    this.onGetAllOrder();

    this.expandingType = false;
    this.exapndIcon = 'fa fa-caret-right fa-2x';

    

    this.subscription = timer(0, 5000).pipe(
      switchMap(() => this.orderService.getAllOrder(this.filterOrderDto))
    ).subscribe((res) => {
      // console.log(res);

      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  

  onSubmit(){

    this.minMaxDate.max = this.filterOrderForm.value.maxDate;
    this.minMaxDate.min = this.filterOrderForm.value.minDate;

    this.minMaxPrice.max = this.filterOrderForm.value.maxPrice;
    this.minMaxPrice.min = this.filterOrderForm.value.minPrice;

    this.filterOrderDto.orderId = this.filterOrderForm.value.orderId;
    this.filterOrderDto.mobileNumber = this.filterOrderForm.value.mobileNumber;
    this.filterOrderDto.customerRequestedOrderAt = this.filterOrderForm.value.RequestedOrder;

    if(this.providerId == 0){
      this.filterOrderDto.providerId = this.filterOrderForm.value.providerId;
    }else if(this.providerId !== 0){
      this.providerId = localStorage.getItem('providerId');
    }
    

    this.filterOrderDto.priceInfo = this.minMaxPrice;
    this.filterOrderDto.dateInfo = this.minMaxDate;

    this.filterOrderDto.pageNumber = 1;

    console.log(this.filterOrderDto);

    this.orderService.getAllOrder(this.filterOrderDto).subscribe((res) =>{
      console.log(res);

      // let orderList = res.data;

      // for(let i = 0; i < orderList.lenght; i++){
      //   console.log(orderList[i]);
      // }
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    })
    
  }

  onClear(){
    this.filterOrderForm.reset();
    this.onGetAllOrder();
  }

  onProviderSelect() {
    this.itemService.getProviders().subscribe((res) => {
      this.provider = res.data;
      console.log(this.provider);
    });
  }

  onGetAllOrder(){

    this.minMaxDate.max = null;
    this.minMaxDate.min = null;

    this.minMaxPrice.max = null;
    this.minMaxPrice.min = null;

    this.filterOrderDto.orderId = null;
    this.filterOrderDto.mobileNumber = null;
    this.filterOrderDto.customerRequestedOrderAt = null;

    if(this.providerId == 0){
      this.filterOrderDto.providerId = null;
    }else if(this.providerId !== 0){
      this.filterOrderDto.providerId = Number(localStorage.getItem('providerId'));
    }

    this.filterOrderDto.priceInfo = this.minMaxPrice;
    this.filterOrderDto.dateInfo = this.minMaxDate;

    this.filterOrderDto.pageNumber = 1;
    
    this.orderService.getAllOrder(this.filterOrderDto).subscribe((res) =>{
      console.log(this.filterOrderDto);
      console.log(res);

      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    })
  }

  setViewOrder(element){
    localStorage.setItem('orderId', element);
    console.log(element);
    this.router.navigateByUrl('/view-order');
  }

  setRejectOrder(value){
    // console.log(value);
    this.rejectElement.orderId = value.orderId;
    this.rejectElement.fullName = value.fullName;
  }

  rejectOrder(){

    this.setServiceUser.serviceUserId = Number(this.serviceUserId); 
    this.orderService.setRejectOrder(this.rejectElement.orderId , this.setServiceUser).subscribe((res) =>{
      console.log(res);
      this.onClear();
    })
  }

  expand(){
    if(this.expandingType == false){
      this.expandingType = true;
      this.exapndIcon = 'fa fa-caret-down fa-2x';

      if (this.providerId == 0) {
        this.providerType = true;
      } else if (this.providerId !== 0) {
        this.providerType = false;
      }

    }else if(this.expandingType == true){
      this.expandingType = false;
      this.exapndIcon = 'fa fa-caret-right fa-2x';

      if (this.providerId == 0) {
        this.providerType = false;
      } else if (this.providerId !== 0) {
        this.providerType = false;
      }
    }
  }

  setAcceptOrder(value){
    this.acceptElement.orderId = value.orderId;
    this.acceptElement.fullName = value.fullName;
  }

  acceptOrder(){

    this.setServiceUser.serviceUserId = Number(this.serviceUserId);
    this.orderService.setAcceptOrder(this.acceptElement.orderId, this.setServiceUser).subscribe((res) =>{
      console.log(res);
      this.onClear();
    })

  }

}
