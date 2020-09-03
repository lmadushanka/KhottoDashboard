import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent implements OnInit {
  order: any = {
    id: '001523',
    by: 'Sashika',
    confirmedAt: '20/08/2020',
    confirmedLocation: 'Colombo',
    taxRate: 2.3,
    taxCharges: 45.6,
    serviceCharges: 125.7,
    orderTotal: 1024.56,
    billTotal: 5623.56,
    orderStatus: 'Queued',
  };

  orderItemList: any = [
    {
      name: 'ABC',
      qty: 3,
      price: 50.56,
      reducePrice: 48.51,
      subTotal: 1563.59,
    },
    {
      name: 'DEF',
      qty: 5,
      price: 75.85,
      reducePrice: 62.35,
      subTotal: 25889.59,
    },
    {
      name: 'IJK',
      qty: 20,
      price: 99.56,
      reducePrice: 54.578,
      subTotal: 10235.25,
    },
  ];

  constructor() {}

  ngOnInit() {}
}
