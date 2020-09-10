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
import { ItemOption } from 'src/app/entity/itemOption';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-item',
  templateUrl: './view-item.component.html',
  styleUrls: ['./view-item.component.scss']
})
export class ViewItemComponent implements OnInit {

  addItemDto: AddItemDto = new AddItemDto();
  itemDto: ItemDto = new ItemDto();
  itemValues: ItemValues[] = [];

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

  }

  

  onGetItemByItemId(value){
    this.ItemService.getItemByItemId(value).subscribe((res) =>{
      console.log(res.data);
      this.itemList = res.data;

      if(res.data.itemTypeId == 1){
        this.itemTypeSelected = "Food";
      }else if(res.data.itemTypeId == 2){
        this.itemTypeSelected =  "Accomadation";
      }

      this.imgURLCover = res.data.coverImage;

      this.itemOptions = res.data.itemOption;

      this.termArray = res.data.terms;

      console.log(this.termArray);
    })
  }

}
