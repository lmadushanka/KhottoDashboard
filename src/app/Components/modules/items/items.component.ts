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

<<<<<<< HEAD
  nextCount:number =1;

  constructor(private session: SessionService,
     private ItemService:ItemService
     
     ) {}
=======
  constructor(
    private session: SessionService,
    private ItemService: ItemService
  ) {}
>>>>>>> b11f4f58b9963708e5b02a234aaede2502e373b5

  ngOnInit() {
    this.session.sessionCheck();
    this.getAllItems(this.nextCount);
  }

  displayedColumns: string[] = ['type', 'name', 'price', 'cover_image'];
  dataSource = ELEMENT_DATA;

<<<<<<< HEAD
  getAllItems(value) {

    this.ItemService.getAllItemList(value).subscribe((res) => {
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      // console.log(this.dataSource);

      
    });
  }

  onPreviewButton(){
    let i = 0;

    i--;

    if(this.nextCount != 1){
      this.nextCount += i; 
    // console.log(this.nextCount);
    }

    this.ItemService.getAllItemList(this.nextCount).subscribe((res) => {
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      // console.log(this.dataSource);

      
=======
  getAllItems() {
    this.ItemService.getAllItemList().subscribe((res) => {
      // console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
      console.log(this.dataSource);
>>>>>>> b11f4f58b9963708e5b02a234aaede2502e373b5
    });
    
  }

  onNextButton(){

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
}
