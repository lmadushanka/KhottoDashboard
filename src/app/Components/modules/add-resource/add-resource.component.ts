import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session/session.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ResourceService } from 'src/app/Services/resource/resource.service';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {

  resourceTypeList = [
    { name: 'Page', value: 1 },
  ];

  // newCategory: Category = new Category();
  // addCategoryDto: AddCategoryDto = new AddCategoryDto();
  // categoryDto: CategoryDto = new CategoryDto();

  //For Images
  public imagePathCover;
  imgURLCover: any;
  coverIf: boolean = false;

  addResourceForm = new FormGroup({
    resourceName: new FormControl(),
    iconClass: new FormControl(),
    resourceTypeId: new FormControl(),
    routePath: new FormControl(),
    parentResourceId: new FormControl(),
    precedenceLevel: new FormControl(),
    resourceOrder: new FormControl()
  });

  coverFile: File = null;

  parentResource = []

  constructor(
    private session: SessionService,
    private router: Router,
    private resourceService: ResourceService,
    ) { }

  ngOnInit(): void {
    this.onGetAllResourceName();
  }

  onGetAllResourceName(){
    this.resourceService.getAllResourceName().subscribe((res) =>{
      console.log(res.data);
      this.parentResource = res.data;
    })
  }

}
