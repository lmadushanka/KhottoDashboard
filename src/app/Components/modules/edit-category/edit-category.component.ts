import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/Services/session/session.service';
import { Category } from 'src/app/Entity/category';
import { FormGroup, FormControl } from '@angular/forms';
import { AddCategoryDto } from 'src/app/Entity/addCategoryDto';
import { CategoryDto } from 'src/app/Entity/categoryDto';
import { CategoryService } from 'src/app/Services/category/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.scss']
})
export class EditCategoryComponent implements OnInit {

  newCategory: Category = new Category();
  addCategoryDto: AddCategoryDto = new AddCategoryDto();
  categoryDto: CategoryDto = new CategoryDto();

  //For Images
  public imagePathCover;
  imgURLCover: any;
  coverIf: boolean = false;

  addCategoryForm = new FormGroup({
    providerType: new FormControl(),
    categoryName: new FormControl(),
    cover: new FormControl(),
  });

  categoryDetails:any = {
    categoryId: '',
    categoryImage: '',
    categoryName: '',
    providerTypeId: '',
  }

  coverFile: File = null;

  providerTypeSelected = '';

  constructor(
    private session: SessionService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.getCategoryByCategoryId(localStorage.getItem('categoryId'));
  }

  getCategoryByCategoryId(value){
    this.categoryService.getCategoryByCategoryId(value).subscribe((res) =>{

      this.categoryDetails = res.data;

      console.log(this.categoryDetails);

      this.providerTypeSelected = String(res.data.providerTypeId);

      this.imgURLCover = res.data.categoryImage;
    })
  }

  onSubmit(){


    this.newCategory.id = Number(this.addCategoryForm.value.providerType);
    this.newCategory.type = this.addCategoryForm.value.categoryName;


      this.newCategory.cover = this.coverFile;
      console.log(this.newCategory);

      this.categoryDto.providerTypeId = this.addCategoryForm.value.providerTypeId;
      this.categoryDto.categoryName = this.newCategory.type;
      this.categoryDto.categoryImage = this.newCategory.cover;

      this.addCategoryDto.categoryCardImage = this.newCategory.cover;
      this.addCategoryDto.categoryInfo = this.categoryDto;

      if(this.newCategory.cover == null){
        this.addCategoryDto.categoryInfo.categoryImage = this.categoryDetails.categoryImage;
        // this.addCategoryDto.categoryCardImage = this.categoryDetails.categoryImage;
      }

      if(this.addCategoryDto.categoryInfo.categoryName == null){
        this.addCategoryDto.categoryInfo.categoryName = this.categoryDetails.categoryName;
      }

      if(this.addCategoryDto.categoryInfo.providerTypeId == null){
        this.addCategoryDto.categoryInfo.providerTypeId = this.categoryDetails.providerTypeId;
      }

      // if(this.newCategory.id == null){
      //   this.addCategoryDto = this.categoryDetails.categoryImage;
      // }

      console.log(this.addCategoryDto)

      this.categoryService.updateCategoryByCategoryId(Number(localStorage.getItem('categoryId')), this.addCategoryDto).subscribe((res) =>{
        console.log(res);
      })

  }

  onClear(){

    this.addCategoryForm.reset();

  }

  onCoverSelected(event) {
    if (event.target.files.length === 0) return;

    var reader = new FileReader();
    this.imagePathCover = event.target.files;
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgURLCover = reader.result;
    };

    this.coverIf = false;

    var file: File = <File>event.target.files[0];
    this.coverFile = file;
    this.newCategory.cover = this.coverFile;
  }

}
