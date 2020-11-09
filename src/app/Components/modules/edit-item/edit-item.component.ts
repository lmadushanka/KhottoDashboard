import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/Services/session/session.service';
import { Item } from 'src/app/Entity/item';
import { ProviderInfo } from '../../../Entity/providerInfo';
import { ItemService } from 'src/app/Services/Item/item.service';
import { AddItemDto } from 'src/app/Entity/addItemDto';
import { ItemDto } from 'src/app/Entity/itemDto';
import { ItemValues } from 'src/app/Entity/itemValues';
import { ItemOption } from 'src/app/Entity/itemOption';
import { Router } from '@angular/router';
import { Term } from 'src/app/Entity/term';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit {

  addItemDto: AddItemDto = new AddItemDto();
  itemDto: ItemDto = new ItemDto();
  itemValues: ItemValues[] = [];

  getItemOptionId:any;

  //For Images
  public imagePathCover;
  imgURLCover: any;
  coverIf: boolean = false;

  newItem: Item = new Item();
  terms: Term[];
  provider: ProviderInfo;
  providerId: any;
  providerType: any;

  itemType = false;

  itemOptions: ItemOption[] = [];
  selectedOption: number[] = [];
  getItemOption: ItemOption[] = []

  editItemForm = new FormGroup({
    itemType: new FormControl(),
    itemName: new FormControl(),
    itemPrice: new FormControl(),
    cover: new FormControl(),
    description: new FormControl(),
    provider: new FormControl(),
    itemAvailability: new FormControl(),
  });

  itemList:any = {
    itemTypeId: '',
    itemName: '',
    price: '',
    simpleDescription: '',
    providerName: '',
    terms: '',
    coverImage: '',
    providerId: ''
  }

  itemTypeSelected = '';
  coverFile: File = null;

  termArray = [];

  errTerm: any = { show: false, value: 'Enter details... !' };


  constructor(
    private session: SessionService,
    private ItemService: ItemService,
    private router: Router) { }

  ngOnInit(): void {
    this.session.sessionCheck();
    this.providerId = localStorage.getItem('providerId');

    if (this.providerId == 0) {
      this.providerType = true;
    } else if (this.providerId !== 0) {
      this.providerType = false;
    }

    this.onGetItemByItemId(localStorage.getItem('itemId'))

    this.onProviderSelect();
  }


  onSubmit(){
    

    this.newItem.name = this.editItemForm.value.itemName;
    this.newItem.type = this.editItemForm.value.itemType;
    this.newItem.price = this.editItemForm.value.itemPrice;
    this.newItem.description = this.editItemForm.value.description;

    if(this.newItem.name == null){
      this.newItem.name = this.itemList.itemName;
    }

    if(this.newItem.type == null){
      this.newItem.type = this.itemList.itemTypeId;
    }

    if(this.newItem.price == null){
      this.newItem.price = this.itemList.price;
    }

    if(this.newItem.description == null){
      this.newItem.description = this.itemList.simpleDescription;
    }

    if(this.coverFile == null){
      this.coverFile = this.itemList.coverImage;
    }

    console.log(this.coverFile);

    var _this = this;
      let serviceUserId = localStorage.getItem('serviceUserId');

      if(this.itemList.terms !== null){
        if (this.termArray.length != 0) {
          this.terms = this.termArray;
        }
      }else{
        this.terms = this.itemList.terms;
      }

      console.log(this.itemOptions);

      if (this.itemOptions.length != 0) {
        for (var i = 0; i < this.itemOptions.length; i++) {
          if (this.itemOptions[i].isActiveOption == true) {
            this.selectedOption.push(this.itemOptions[i].optionId);
          }
        }
      }

      this.newItem.coverImage = this.coverFile;
      this.newItem.terms = this.terms;
      this.newItem.availability = this.editItemForm.value.itemAvailability;

      if(this.newItem.availability == null){
        this.newItem.availability = null;
      }
      

      

      this.itemDto.itemTypeId = Number(this.newItem.type);
      this.itemDto.price = Number(this.newItem.price);
      this.itemDto.serviceUserId = Number(serviceUserId);
      this.itemDto.itemOptionValues = this.selectedOption;

      // add provider
      if (this.providerId == 0) {
        this.itemDto.providerId = Number(this.editItemForm.value.provider);
      } else if (this.providerId == 0) {
        this.itemDto.providerId = Number(this.providerId);
      }

      // this.addItemInfo('name', this.newItem.name);
      this.addItemInfo('coverImage', this.coverFile);
      // this.addItemInfo('simpleDescription', this.newItem.description);
      this.addItemInfo('terms', this.newItem.terms);
      this.addItemInfo('availability', Number(this.newItem.availability));
      this.itemDto.itemValues = this.itemValues;

      this.addItemDto.coverImage = this.newItem.coverImage;
      this.addItemDto.itemInfo = this.itemDto;
      this.addItemDto.itemInfo.simpleDescription = this.newItem.description;
      this.addItemDto.itemInfo.itemName = this.newItem.name;
      this.addItemDto.itemInfo.itemId = Number(localStorage.getItem('itemId'));

     

      console.log(this.addItemDto);

      this.ItemService.updateItemByItemId(this.addItemDto).subscribe((res)=>{
        console.log(res);
        this.router.navigateByUrl('/items');
      })

  }

  addItemInfo(type, name) {
    if (name != '') {
      this.itemValues.push({
        propertyIdentifier: type,
        itemValueStr: name,
      });
    }
  }


  onGetItemByItemId(value){
    this.ItemService.getItemByItemId(value).subscribe((res) =>{
      
      
      console.log(res.data);
      this.itemList = res.data;

      if(res.data.itemTypeId == 1){
        this.itemTypeSelected = "1";
      }else if(res.data.itemTypeId == 2){
        this.itemTypeSelected =  "2";
      }

      this.imgURLCover = res.data.coverImage;

      // this.itemOptions = res.data.itemOption
      

      for(let i = 0 ; i < this.itemOptions.length; i++){
        if(this.itemOptions[i].optionId == res.data.itemOption[i].optionId){
          console.log(this.itemOptions[i]);
          this.itemOptions[i].isActiveOption = res.data.itemOption[i].isActiveOption;
          console.log(i);
        }
      }

      this.getItemOption = res.data.itemOption;

      

      this.termArray = res.data.terms;
      this.onItemTypeSelect(res.data.itemTypeId);
      
    })
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
    this.newItem.coverImage = this.coverFile;
  }

  onProviderSelect() {
    this.ItemService.getProviders().subscribe((res) => {
      this.provider = res.data;
    });
  }

  onItemTypeSelect(value) {
    if (value == 2) {
      this.itemType = true;
    } else if (value == 1) {
      this.itemType = false;
    }

    this.ItemService.getOptionsByItemType(value).subscribe((res) => {
      // console.log(res.data);
      this.itemOptions = res.data;

      for (var i = 0; i < this.itemOptions.length; i++) {
        this.itemOptions[i].isActiveOption = false;

        for(var j = 0; j < this.getItemOption.length; j++){
          if(this.itemOptions[i].optionId == this.getItemOption[j].optionId){
            this.itemOptions[i].isActiveOption = true;
          }
        }
      }

      console.log(this.itemOptions);
    });
  }

  updateOption(name, optId, i) {
    let o = <HTMLInputElement>document.getElementById(name + optId);
    let value = o.checked;

    this.itemOptions[i].isActiveOption = value;
  }

  addTerm(termA){

    console.log(termA);
    if(termA != ''){
      this.termArray.push(termA);
      let t = <HTMLInputElement>document.getElementById('term');
      t.value = '';
    }else{
      this.errTerm.show = true;
    }
  }

  removeTerm(i) {
    this.termArray.splice(i, 1);
  }

}
