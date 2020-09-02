import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss']
})
export class ViewOrderComponent implements OnInit {

  addItemForm = new FormGroup({
    itemType: new FormControl(),
    itemName: new FormControl(),
    itemPrice: new FormControl(),
    cover: new FormControl(),
    description: new FormControl(),
    provider: new FormControl(),
    itemAvailability: new FormControl(),
  });


  constructor() { }

  ngOnInit(): void {
  }

}
