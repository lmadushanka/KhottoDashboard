import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/Services/session/session.service';
import { ItemOptionService } from 'src/app/Services/item-option/item-option.service';
import { Router } from '@angular/router';
import { AddItemOptionDto } from 'src/app/Entity/addItemOptionDto';

@Component({
  selector: 'app-view-item-option',
  templateUrl: './view-item-option.component.html',
  styleUrls: ['./view-item-option.component.scss']
})
export class ViewItemOptionComponent implements OnInit {

  addItemOption = new FormGroup({
    itemType: new FormControl(),
    isActiveOption: new FormControl(),
    itemOptionName:new FormControl(),
  });

  itemOptionDetails:any = {
    optionId: '',
    optionName: '',
    itemTypeId: '',
    isActiveOption: '',
    createdAt: '',
    deletedAt: '',
    
  }

  itemType:any;

  addItemOptionDto: AddItemOptionDto = new AddItemOptionDto();

  constructor(
    private sessionService: SessionService,
    private itemOptionService: ItemOptionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.itemOptionService.getItemOptionByItemType(Number(localStorage.getItem('itemOptionId'))).subscribe((res) =>{
      console.log(res.data);

      this.itemOptionDetails = res.data;

      if(this.itemOptionDetails.itemTypeId == 1){
        this.itemType = 'Food';
      }else if(this.itemOptionDetails.itemTypeId == 2){
        this.itemType = 'Accomadation';
      }
    });
  }


}
