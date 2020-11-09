import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/Services/session/session.service';
import { ItemService } from 'src/app/Services/Item/item.service';
import { Router } from '@angular/router';
import { SerchItem } from 'src/app/Entity/serchItem';
import { getInterpolationArgsLength } from '@angular/compiler/src/render3/view/util';

export interface PeriodicElement {
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

  nextCount:number;

  ELEMENT_DATA: PeriodicElement[] = [];
  deleteElement: any = { name: '', itemTypeId: 0, providerName: ''};

  serchItem:SerchItem = new SerchItem();

  constructor(
    private session: SessionService,
    private ItemService: ItemService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.session.sessionCheck();

    this.serchItem.itemTypeId = null;
    if(Number(localStorage.getItem('providerId')) == 0){
      this.serchItem.providerId = null;
    }else if(Number(localStorage.getItem('providerId')) !== 0){
      this.serchItem.providerId = Number(localStorage.getItem('providerId'));
    }
    this.serchItem.pageNumber = 1;

    this.nextCount = 1;

    console.log(this.serchItem);
  
    this.getAllItems();
  }

  displayedColumns: string[] = [
    'name',
    'price',
    'cover_image',
    'view',
    'edit',
    'delete',
  ];
  dataSource = ELEMENT_DATA;

  getAllItems() {
    this.ItemService.getAllItemList(this.serchItem).subscribe((res) => {
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      // console.log(this.dataSource);
    });
  }

  onPreviewButton() {
    let i = 0;

    i--;

    if (this.serchItem.pageNumber != 1) {
      this.serchItem.pageNumber += i;
      // console.log(this.nextCount);
      this.nextCount += i;
    }

    this.ItemService.getAllItemList(this.serchItem).subscribe((res) => {
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      // console.log(this.dataSource);
    });
  }

  onNextButton() {
    let i = 0;

    i++;

    this.serchItem.pageNumber += i;
    // console.log(this.nextCount);

    this.nextCount += i;

    this.ItemService.getAllItemList(this.serchItem).subscribe((res) => {
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      // console.log(this.dataSource);
    });
  }

  setDeleteItem(element) {
    this.deleteElement.name = element.itemName;
    this.deleteElement.itemId = element.itemId;
    this.deleteElement.providerName = element.providerName;
  }

  deleteItem() {
    console.log(this.deleteElement.itemId);
    this.ItemService.deleteItemById(this.deleteElement.itemId).subscribe((res) => {
      this.getAllItems();
    });
  }

  setViewItem(value){
    localStorage.setItem('itemId', value);
    console.log(value);
    this.router.navigateByUrl('/view-item');
  }

  setEditItem(element){
    localStorage.setItem('itemId', element);
    this.router.navigateByUrl('/edit-item');
  }
}
