import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/Services/session/session.service';
import { ItemOptionService } from 'src/app/Services/item-option/item-option.service';
import { Router } from '@angular/router';
import { from } from 'rxjs';

export interface PeriodicElement {
  optionId: string;
  itemType: string;
  optionName: any;
  isActiveOption: string;
  view: string;
  edit: string;
  delete: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-item-option',
  templateUrl: './item-option.component.html',
  styleUrls: ['./item-option.component.scss']
})
export class ItemOptionComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] = [];

  filterItemOption = new FormGroup({
    itemType: new FormControl(),
    isActiveOption: new FormControl(),
  });

  serviceUserId:any;

  filterItemOptionDto:any = {
    itemTypeId: '',
    isActiveOption: '',
  }


  serviceUserTypeList = [];

  constructor(
    private session: SessionService,
    private userService: UserService,
    private router: Router,
    private itemOptionService: ItemOptionService
    ) { }

    displayedColumns: string[] = [
      'optionId',
      'itemType',
      'optionName',
      'isActiveOption',
      'view',
      'edit',
      'delete',
    ];

    expireElement: any = { optionId: '', optionName: '' };

    activeOption: any =  { isActiveOption: ''};

    dataSource = ELEMENT_DATA;

  ngOnInit(): void {

    this.filterItemOptionDto.itemTypeId = null;
    this.filterItemOptionDto.isActiveOption = true;

    console.log(this.filterItemOptionDto);

    this.itemOptionService.getItemOptionByItemId(this.filterItemOptionDto).subscribe((res) =>{
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    });
    
  }

  onSubmit(){


    this.filterItemOptionDto.itemTypeId = Number(this.filterItemOption.value.itemType);
    this.filterItemOptionDto.isActiveOption = Boolean(this.filterItemOption.value.isActiveOption);

    console.log(this.filterItemOptionDto);

    this.itemOptionService.getItemOptionByItemId(this.filterItemOptionDto).subscribe((res) =>{
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      this.filterItemOption.reset();
    });

  }

  onClear(){

    this.filterItemOption.reset();
    
  }

  viewItemOption(value){
    localStorage.setItem('itemOptionId', value);
    this.router.navigateByUrl('/view-item-option');
  }

  editItemOption(value){
    localStorage.setItem('itemOptionId', value);
    this.router.navigateByUrl('/edit-item-option');
  }

  expireItemOption(value){
    console.log(value);

    this.expireElement.optionId = value.optionId;
    this.expireElement.optionName = value.optionName;
    this.activeOption.isActiveOption = false;
  }

  expiredOption(){
    this.itemOptionService.expireItemOption(Number(this.expireElement.optionId), this.activeOption.isActiveOption).subscribe((res) => {
      console.log(res);

      this.itemOptionService.getItemOptionByItemId(this.filterItemOptionDto).subscribe((res) =>{
        console.log(res);
        this.ELEMENT_DATA = res.data;
        this.dataSource = this.ELEMENT_DATA;
      });
    });
  }

}

