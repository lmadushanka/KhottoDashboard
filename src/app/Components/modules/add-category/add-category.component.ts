import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session/session.service';
import { Category } from 'src/app/entity/category';
import { FormGroup, FormControl } from '@angular/forms';
import { AddCategoryDto } from 'src/app/entity/addCategoryDto';
import { CategoryDto } from 'src/app/entity/categoryDto';
import { CategoryService } from 'src/app/services/category/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
})
export class AddCategoryComponent implements OnInit {
  newCategory: Category = new Category();
  addCategoryDto: AddCategoryDto = new AddCategoryDto();
  categoryDto: CategoryDto = new CategoryDto();

  //For Images
  public imagePathCover;
  imgURLCover: any;

  addCategoryForm = new FormGroup({
    providerType: new FormControl(),
    categoryName: new FormControl(),
    cover: new FormControl(),
  });

  coverFile: File = null;

  providerTypeList = [
    { name: 'Resturent', value: 1 },
    { name: 'Hotel', value: 2 },
  ];

  constructor(
    private session: SessionService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.session.sessionCheck();
  }

  onSubmit() {
    var _this = this;

    this.newCategory.id = this.addCategoryForm.value.providerType;
    this.newCategory.type = this.addCategoryForm.value.categoryName;
    this.newCategory.cover = this.coverFile;
    console.log(this.newCategory);

    this.categoryDto.providerTypeId = Number(this.newCategory.id);
    this.categoryDto.categoryName = this.newCategory.type;
    this.categoryDto.categoryImage = this.newCategory.cover;

    this.addCategoryDto.categoryCardImage = this.newCategory.cover;
    this.addCategoryDto.categoryInfo = this.categoryDto;

    console.log(this.addCategoryDto);
    this.categoryService
      .addCategory(this.addCategoryDto)
      .subscribe((res) => {});

    setTimeout(function () {
      _this.resetForm();
    }, 2000);
  }

  resetForm() {
    this.addCategoryForm.reset();
    this.coverFile = null;
    this.imgURLCover = null;
  }

  onClear(){
    this.addCategoryForm.reset();
    this.coverFile = null;
    this.imgURLCover = null;
  }

  onCoverSelected(event) {
    if (event.target.files.length === 0) return;

    var reader = new FileReader();
    this.imagePathCover = event.target.files;
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgURLCover = reader.result;
    };

    var file: File = <File>event.target.files[0];
    this.coverFile = file;
    this.newCategory.cover = this.coverFile;
  }
}
