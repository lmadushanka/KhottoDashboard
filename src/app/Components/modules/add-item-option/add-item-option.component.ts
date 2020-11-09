import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/Services/session/session.service';
import { ItemOptionService } from 'src/app/Services/item-option/item-option.service';
import { Router } from '@angular/router';
import { AddItemOptionDto } from 'src/app/Entity/addItemOptionDto';

@Component({
  selector: 'app-add-item-option',
  templateUrl: './add-item-option.component.html',
  styleUrls: ['./add-item-option.component.scss']
})
export class AddItemOptionComponent implements OnInit {

  addItemOption = new FormGroup({
    itemType: new FormControl(),
    isActiveOption: new FormControl(),
    itemOptionName:new FormControl(),
  });

  addItemOptionDto: AddItemOptionDto = new AddItemOptionDto();

  constructor(
    private sessionService: SessionService,
    private itemOptionService: ItemOptionService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(){

    this.addItemOptionDto.optionName = this.addItemOption.value.itemOptionName;
    this.addItemOptionDto.itemTypeId = Number(this.addItemOption.value.itemType);
    this.addItemOptionDto.isActiveOption = Boolean(this.addItemOption.value.isActiveOption);

    console.log(this.addItemOptionDto);

    this.itemOptionService.addItemOption(this.addItemOptionDto).subscribe((res) =>{
      console.log(res);

      this.addItemOption.reset();
    });

  }

  onClear(){
    this.addItemOption.reset();
  }

}
