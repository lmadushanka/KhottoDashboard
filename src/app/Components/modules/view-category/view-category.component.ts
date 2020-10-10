import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CategoryService } from 'src/app/Services/category/category.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss']
})
export class ViewCategoryComponent implements OnInit {

  //For Images
  public imagePathCover;
  imgURLCover: any;
  coverIf: boolean = false;

  categoryDetails: any ={
    providerTypeId: '',
    categoryName: '',
    categoryImage: '',
  }


  providerType:any;

  addCategoryForm = new FormGroup({
    providerType: new FormControl(),
    categoryName: new FormControl(),
    cover: new FormControl(),
  });

  constructor(
    private categoryService: CategoryService,
  ) { }

  ngOnInit(): void {

    this.categoryService.getCategoryByCategoryId(localStorage.getItem('categoryId')).subscribe((res) =>{
      console.log(res);

      this.categoryDetails = res.data;

      if(this.categoryDetails.providerTypeId == 1){
        this.providerType = 'Food';
      }else if(this.categoryDetails.providerTypeId == 2){
        this.providerType = 'Accomadation';
      }

      this.imgURLCover = res.data.categoryImage
    })
    
  }

}
