import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session/session.service';
import { CategoryService } from 'src/app/services/category/category.service';

export interface CategoryElement {
  categoryId: number;
  categoryImage: string;
  categoryName: string;
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  ELEMENT_DATA: CategoryElement[] = [];

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
  }

  displayedColumns: string[] = ['categoryId', 'categoryName', 'categoryImage'];
  dataSource = this.ELEMENT_DATA;

  getCategory(type: number) {
    this.category.getCategoryByType(type).subscribe((res) => {
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      
    });
  }
}
