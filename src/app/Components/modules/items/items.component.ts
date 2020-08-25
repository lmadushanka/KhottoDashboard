import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session/session.service';
import { ItemService } from 'src/app/services/Item/item.service';

export interface PeriodicElement {
  type: string;
  name: string;
  price: number;
  imageUrl: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss'],
})
export class ItemsComponent implements OnInit {
  ELEMENT_DATA: PeriodicElement[] = [];

  constructor(private session: SessionService,
     private ItemService:ItemService
     
     ) {}

  ngOnInit() {
    this.session.sessionCheck();
    this.getAllItems();
  }

  displayedColumns: string[] = ['type', 'name', 'price', 'cover_image'];
  dataSource = ELEMENT_DATA;

  getAllItems() {

    this.ItemService.getAllItemList().subscribe((res) => {
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      console.log(this.dataSource);

      
    });
  }

}
