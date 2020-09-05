import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Services/order/order.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent implements OnInit {

  getOrderId:any;

  commonOrderInfo:any;
  orderRecords:any;
  
  order: any = {
    orderId: '',
    by: '',
    confirmedAt: '',
    confirmedLocation: '',
    taxRate: '',
    taxCharges: '',
    serviceCharges: '',
    orderTotal: '',
    billTotal: '',
    orderStatus: '',
    itemName:''
  };

  orderItemList: any = [];

  constructor(private OrderService: OrderService) {}

  ngOnInit() {
    this.getOrderId = Number(localStorage.getItem('orderId'));
    this.getOrderDetails();
  }

  getOrderDetails(){
    this.OrderService.getOrderById(this.getOrderId).subscribe((res) => {
      console.log(res.data);
      this.commonOrderInfo = res.data.commonOrderInfo;
      this.orderRecords = res.data.orderRecords;
      // console.log(Number(this.orderDetails.billTotal));

      this.order.billTotal = Number(this.commonOrderInfo.billTotal);
      this.order.orderId = this.commonOrderInfo.orderId;
      this.order.confirmedAt = this.commonOrderInfo.customerConfirmedAt;
      this.order.confirmedLocation = this.commonOrderInfo.customerConfirmedLocation;
      this.order.taxRate = this.commonOrderInfo.taxRate;
      this.order.serviceCharges = this.commonOrderInfo.serviceCharge;
      this.order.by = this.commonOrderInfo.fullName;
      this.order.orderTotal = this.commonOrderInfo.orderTotal;

      if(this.commonOrderInfo.orderStatus == false){
        this.order.orderStatus = '';
      }else{
        this.order.orderStatus = this.commonOrderInfo.orderStatus;
      }

      this.orderItemList = this.orderRecords;



    });
  }
}
