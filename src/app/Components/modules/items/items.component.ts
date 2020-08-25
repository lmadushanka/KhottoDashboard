import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session/session.service';
import { ItemService } from 'src/app/services/Item/item.service';

export interface PeriodicElement {
  type: string;
  name: string;
  price: number;
  imageUrl: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {
    type: 'Food',
    name: 'Bread',
    price: 170.5,
    imageUrl: 'https://picsum.photos/50',
  },
  {
    type: 'Bevarages',
    name: 'Orange Juice',
    price: 100.5,
    imageUrl: 'https://picsum.photos/50',
  },
  {
    type: 'Snack',
    name: 'Bisucuit',
    price: 50.5,
    imageUrl: 'https://picsum.photos/50',
  },
  {
    type: 'Soup',
    name: 'Vegitable',
    price: 150.5,
    imageUrl: 'https://picsum.photos/50',
  },
];

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
    this.getAllProvider();
  }

  displayedColumns: string[] = ['type', 'name', 'price', 'cover_image'];
  dataSource = ELEMENT_DATA;

  getAllProvider() {

    this.ItemService.getAllItemList().subscribe((res) => {
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      console.log(this.dataSource);

      
    });
  }

}
