import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/Services/session/session.service';
import { Item } from 'src/app/Entity/item';
import { Term } from 'src/app/Entity/term';
import { ProviderInfo } from '../../../Entity/providerInfo';
import { ItemService } from 'src/app/Services/Item/item.service';
import { AddItemDto } from 'src/app/Entity/addItemDto';
import { ItemDto } from 'src/app/Entity/itemDto';
import { ItemValues } from 'src/app/Entity/itemValues';
import { ItemOption } from 'src/app/Entity/itemOption';
import { Router } from '@angular/router';

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
  terms: [];
  provider: ProviderInfo;
  providerId: any;
  providerType: any;

  itemType = false;

  itemOptions: ItemOption[] = [];
  selectedOption: number[] = [];

  addItemForm = new FormGroup({
    itemType: new FormControl(),
    itemName: new FormControl(),
    itemPrice: new FormControl(),
    cover: new FormControl(),
    description: new FormControl(),
    provider: new FormControl(),
    itemAvailability: new FormControl(),
  });

  itemList:any = {
    itemType: '',
    itemName: '',
    price: '',
    simpleDescription: '',
    providerName: '',
    terms: '',
  }

  itemTypeSelected = '';
  coverFile: File = null;

  termArray: Term[] = [];

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

      this.itemOptions = res.data.itemOption;

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
      console.log(this.provider);
    });
  }

  onItemTypeSelect(value) {
    if (value == 2) {
      this.itemType = true;
    } else if (value == 1) {
      this.itemType = false;
    }

    // console.log(value);

    this.ItemService.getOptionsByItemType(value).subscribe((res) => {
      console.log(res.data);
      this.itemOptions = res.data;

      for (var i = 0; i < this.itemOptions.length; i++) {
        this.itemOptions[i].isActiveOption = false;
      }
    });
  }

  updateOption(name, optId, i) {
    let o = <HTMLInputElement>document.getElementById(name + optId);
    let value = o.checked;

    this.itemOptions[i].isActiveOption = value;
  }

  addTerm(termA) {
    if (termA != '') {
      this.termArray.push(termA);
      let t = <HTMLInputElement>document.getElementById('term');
      t.value = '';
    } else {
      this.errTerm.show = true;
    }
  }

  removeTerm(i) {
    this.termArray.splice(i, 1);
  }

}
