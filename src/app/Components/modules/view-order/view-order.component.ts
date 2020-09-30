import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/Services/order/order.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent implements OnInit {
  getOrderId: any;

  commonOrderInfo: any;
  orderRecords: any;

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
    itemName: '',
  };

  setTransaction: any = {
    receivedAmount:'',
    orderTotal:'',
    returnedBalanceAmount: '',
    serviceUserId: ' ',
    transactionType:''
  }

  typeOfProviderConfirmatio:any = {typeOfProviderConfirmatio:''};


  orderItemList: any = [];

  public amount:number;

  balance:any;

  confirmation = [
    { title: 'Cash', value: 1 },
    // { title: 'No', value: 0 },
  ]

  filterOrderForm = new FormGroup({
    confirmation: new FormControl(),
    amount: new FormControl()
  });
  

  constructor(private OrderService: OrderService, private router: Router) {}

  ngOnInit() {
    this.getOrderId = Number(localStorage.getItem('orderId'));
    this.getOrderDetails();
  }

  getOrderDetails() {
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
      this.order.taxCharges = this.commonOrderInfo.taxCharge;

      if (this.commonOrderInfo.orderStatus == false) {
        this.order.orderStatus = '';
      } else {
        this.order.orderStatus = this.commonOrderInfo.orderStatus;
      }

      this.orderItemList = this.orderRecords;
    });
  }

  onSubmit(){
    this.typeOfProviderConfirmatio.typeOfProviderConfirmatio = Number(this.filterOrderForm.value.confirmation);

    this.OrderService.setConfirmOrder(this.order.orderId , this.typeOfProviderConfirmatio).subscribe((res) =>{
      console.log(res);
    })

    this.setTransaction.receivedAmount = this.amount;
    this.setTransaction.orderTotal = this.order.orderTotal;
    this.setTransaction.returnedBalanceAmount = this.amount - this.order.billTotal;
    this.setTransaction.serviceUserId = Number(localStorage.getItem('serviceUserId'));
    this.setTransaction.transactionType = Number(this.filterOrderForm.value.confirmation);

    console.log(this.setTransaction);

    this.OrderService.setTrancaction(this.setTransaction).subscribe((res) => {
      console.log(res);
    })

    this.router.navigateByUrl('/order');

  }
}
