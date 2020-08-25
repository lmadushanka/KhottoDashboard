import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session/session.service';
import { Item } from 'src/app/entity/item';
import { Term } from 'src/app/entity/term';
import { ProviderInfo } from '../../../Entity/providerInfo';
import { ItemService } from 'src/app/services/Item/item.service';
import { AddItemDto } from 'src/app/entity/addItemDto';
import { ItemDto } from 'src/app/entity/itemDto';
import { ItemValues } from 'src/app/entity/itemValues';
import { OpenDays } from 'src/app/entity/open-days';
import { ProviderService } from '../../../Services/provider/provider.service';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
})
export class AddItemComponent implements OnInit {
  addItemDto: AddItemDto = new AddItemDto();
  itemDto: ItemDto = new ItemDto();
  itemValues: ItemValues[] = [];

  //For Images
  public imagePathCover;
  imgURLCover: any;

  newItem: Item = new Item();
  terms: Term[];
  provider: ProviderInfo;
  providerId: any;
  providerType:any;


  itemType = false;

  options: any;

  addItemForm = new FormGroup({
    itemType: new FormControl(),
    itemName: new FormControl(),
    itemPrice: new FormControl(),
    cover: new FormControl(),
    description: new FormControl(),
    provider: new FormControl(),
    itemAvailability: new FormControl(),
  });

  coverFile: File = null;

  itemTypeList = [
    { value: 1, name: 'Food' },
    { value: 2, name: 'Accomadation' },
  ];

  termArray: Term[] = [];

  errTerm: any = { show: false, value: 'Enter details... !' };


  constructor(
    private session: SessionService,
    private ItemService:ItemService
  ) {}

  ngOnInit() {
    this.session.sessionCheck();
    this.providerId = localStorage.getItem('providerId');

    if(this.providerId == 0){
      this.providerType = true;
  }else if(this.providerId !== 0){
    this.providerType = false;
  }
    this.onProviderSelect();
  }

  onSubmit() {
    var _this = this;
    let serviceUserId = localStorage.getItem('serviceUserId');
    

    if (this.termArray.length != 0) {
      this.terms = this.termArray;
    }

    this.newItem.name = this.addItemForm.value.itemName;
    this.newItem.type = this.addItemForm.value.itemType;
    this.newItem.price = this.addItemForm.value.itemPrice;
    this.newItem.coverImage = this.coverFile;
    this.newItem.description = this.addItemForm.value.description;
    this.newItem.terms = this.terms;
    this.newItem.availability = this.addItemForm.value.itemAvailability
    // console.log(this.newItem);

    this.itemDto.itemTypeId = Number(this.newItem.type);
    this.itemDto.price = Number(this.newItem.price);
    this.itemDto.serviceUserId = Number(serviceUserId);

    // add provider
    if(this.providerId == 0){
      this.itemDto.providerId = this.addItemForm.value.provider;
    }else if(this.providerId == 0){
      this.itemDto.providerId = Number(this.providerId);
    }
    
    this.addItemInfo('name', this.newItem.name);
    this.addItemInfo('coverImage', this.coverFile);
    this.addItemInfo('simpleDescription', this.newItem.description);
    this.addItemInfo('terms', this.newItem.terms);
    this.addItemInfo('availability', this.newItem.availability);
    this.itemDto.itemValues = this.itemValues;

    this.addItemDto.coverImage = this.newItem.coverImage;
    this.addItemDto.itemInfo = this.itemDto;

    console.log(this.addItemDto);
    this.ItemService.addItem(this.addItemDto).subscribe((res) => {});

    setTimeout(function () {
      _this.resetForm();
    }, 2000);
  }

  addItemInfo(type, name) {
    if (name != '') {
      this.itemValues.push({
        propertyIdentifier: type,
        itemValueStr: name,
      });
    }
  }

  addTerm(termA) {
    if (termA != '') {
      this.termArray.push({
        term: termA,
      });
      let t = <HTMLInputElement>document.getElementById('term');
      t.value = '';
    } else {
      this.errTerm.show = true;
    }
  }

  removeTerm(i) {
    this.termArray.splice(i, 1);
  }

  resetForm() {
    this.addItemForm.reset();
    this.newItem.coverImage = null;
    this.termArray = [];
    this.itemValues = [];
    this.terms = null;
    this.coverFile = null;
    this.imgURLCover = null;
  }

  onClear(){
    this.addItemForm.reset();
    this.newItem.coverImage = null;
    this.termArray = [];
    this.itemValues = [];
    this.terms = null;
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
    this.newItem.coverImage = this.coverFile;
  }

  onProviderSelect(){
    this.ItemService.getProviders().subscribe((res) => {
      this.provider = res.data;
      console.log(this.provider);
    });
  }

  onItemrTypeSelect(value) {
    if(value == 2){
      this.itemType = true;
    }else if(value == 1){
      this.itemType = false;
    }

    console.log(value);

    this.ItemService.getOptionByItemType(value).subscribe((res) =>{
      console.log(res.data);
      this.options = res.data;
    });
    
  }

}


