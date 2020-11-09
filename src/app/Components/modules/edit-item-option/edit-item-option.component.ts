import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/Services/session/session.service';
import { ItemOptionService } from 'src/app/Services/item-option/item-option.service';
import { Router } from '@angular/router';
import { AddItemOptionDto } from 'src/app/Entity/addItemOptionDto';

@Component({
  selector: 'app-edit-item-option',
  templateUrl: './edit-item-option.component.html',
  styleUrls: ['./edit-item-option.component.scss']
})
export class EditItemOptionComponent implements OnInit {

  editItemOption = new FormGroup({
    itemType: new FormControl(),
    isActiveOption: new FormControl(),
    itemOptionName:new FormControl(),
  });

  itemOptionSelected = '';
  itemTypeSelected = '';

  addItemOptionDto: AddItemOptionDto = new AddItemOptionDto();

  itemOptionDetails:any = {
    optionId: '',
    optionName: '',
    itemTypeId: '',
    isActiveOption: '',
    createdAt: '',
    deletedAt: '',
    
  }

  constructor(
    private sessionService: SessionService,
    private itemOptionService: ItemOptionService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.itemOptionService.getItemOptionByItemType(Number(localStorage.getItem('itemOptionId'))).subscribe((res) =>{
      console.log(res.data);

      this.itemOptionDetails = res.data;


      if(this.itemOptionDetails.isActiveOption == true){
        this.itemOptionSelected  = "1";
      }else if(this.itemOptionDetails.isActiveOption == true){
        this.itemOptionSelected = "2";
      }


      this.itemTypeSelected = String(this.itemOptionDetails.itemTypeId);

      this.itemOptionDetails.itemTypeId = res.data.itemTypeId;

    });

  }
  onSubmit(){
    
    this.addItemOptionDto.optionName = this.editItemOption.value.itemOptionName;
    this.addItemOptionDto.itemTypeId = Number(this.editItemOption.value.itemType);

    if(Number(this.editItemOption.value.isActiveOption) == 1){
      this.addItemOptionDto.isActiveOption = true;
    }else if(Number(this.editItemOption.value.isActiveOption) == 2){
      this.addItemOptionDto.isActiveOption = false;
    }

    if(this.addItemOptionDto.optionName == null){
      this.addItemOptionDto.optionName = this.itemOptionDetails.optionName;
    }

    if(this.addItemOptionDto.itemTypeId == 0){
      this.addItemOptionDto.itemTypeId = this.itemOptionDetails.itemTypeId;
    }

    if(this.addItemOptionDto.isActiveOption == null){
      this.addItemOptionDto.isActiveOption = this.itemOptionDetails.isActiveOption;
    }

    console.log(this.addItemOptionDto);

    this.itemOptionService.updateItemOptionByItemOptionId(Number(localStorage.getItem('itemOptionId')), this.addItemOptionDto).subscribe((res) =>{
      console.log(res);

      this.router.navigateByUrl('/item-option');
    })

  }

  onClear(){
    this.editItemOption.reset();
  }

}
