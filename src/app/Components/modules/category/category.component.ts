import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/Services/session/session.service';
import { CategoryService } from 'src/app/Services/category/category.service';

export interface CategoryElement {
  categoryId: number;
  categoryImage: string;
  categoryName: string;
  view: string;
  edit: string;
  delete: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  ELEMENT_DATA: CategoryElement[] = [];
  deleteElement: any = { name: '', itemTypeId: 0 };

  providerTypeList = [
    { name: 'Resturent', value: 1 },
    { name: 'Hotel', value: 2 },
  ];

  constructor(
    private session: SessionService,
    private category: CategoryService
  ) {}

  ngOnInit() {
    this.session.sessionCheck();
    this.getAllCategory();
  }

  displayedColumns: string[] = ['categoryId', 'categoryName','view','edit','delete'];
  dataSource = this.ELEMENT_DATA;

  getCategory(type: number) {
    this.category.getCategoryByType(type).subscribe((res) => {
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      
    });
  }

  getAllCategory(){
    this.category.getAllCategory().subscribe((res) => {
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    });
  }

  setDeleteItem(element) {
    this.deleteElement.name = element.name;
    this.deleteElement.itemId = element.itemId;
  }

  // deleteItem() {
  //   console.log(this.deleteElement.itemId);
  //   this.ItemService.deleteItemById(this.deleteElement.itemId).subscribe((res) => {
  //     this.getAllItems(this.nextCount);
  //   });
  // }
}
