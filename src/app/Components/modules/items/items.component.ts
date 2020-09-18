import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/Services/session/session.service';
import { ItemService } from 'src/app/Services/Item/item.service';
import { Router } from '@angular/router';

export interface PeriodicElement {
  type: string;
  name: string;
  price: number;
  imageUrl: string;
  view: string;
  edit: string;
  delete: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  ELEMENT_DATA: PeriodicElement[] = [];
  deleteElement: any = { name: '', itemTypeId: 0 };

  nextCount: number = 1;

  constructor(
    private session: SessionService,
    private ItemService: ItemService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.session.sessionCheck();
    this.getAllItems(this.nextCount);
  }

  displayedColumns: string[] = [
    'type',
    'name',
    'price',
    'cover_image',
    'view',
    'edit',
    'delete',
  ];
  dataSource = ELEMENT_DATA;

  getAllItems(value) {
    this.ItemService.getAllItemList(value).subscribe((res) => {
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      // console.log(this.dataSource);
    });
  }

  onPreviewButton() {
    let i = 0;

    i--;

    if (this.nextCount != 1) {
      this.nextCount += i;
      // console.log(this.nextCount);
    }

    this.ItemService.getAllItemList(this.nextCount).subscribe((res) => {
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      // console.log(this.dataSource);
    });
  }

  onNextButton() {
    let i = 0;

    i++;

    this.nextCount += i;
    // console.log(this.nextCount);

    this.ItemService.getAllItemList(this.nextCount).subscribe((res) => {
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      // console.log(this.dataSource);
    });
  }

  setDeleteItem(element) {
    this.deleteElement.name = element.name;
    this.deleteElement.itemId = element.itemId;
  }

  deleteItem() {
    console.log(this.deleteElement.itemId);
    this.ItemService.deleteItemById(this.deleteElement.itemId).subscribe((res) => {
      this.getAllItems(this.nextCount);
    });
  }

  setViewItem(value){
    localStorage.setItem('itemId', value);
    console.log(value);
    this.router.navigateByUrl('/view-item');
  }
}
