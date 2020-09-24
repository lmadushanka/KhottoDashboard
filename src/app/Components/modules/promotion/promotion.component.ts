import { Component, OnInit } from '@angular/core';
import { ResourceService } from 'src/app/Services/resource/resource.service';
import { SessionService } from 'src/app/Services/session/session.service';
import { PermissionService } from 'src/app/Services/permission/permission.service'
import { FormGroup, FormControl } from '@angular/forms';
import { PageNumber } from 'src/app/Entity/pageNumber';
import { ProviderInfo } from '../../../Entity/providerInfo';
import { ItemService } from 'src/app/Services/Item/item.service';
import { DiscountService } from 'src/app/Services/discount/discount.service';
import { FilterPromotionDto } from 'src/app/Entity/filterPromotionDto';
import { PromotionService } from 'src/app/Services/promotion/promotion.service';

export interface ResourceElement {
  promotionId: number;
  minimumOrderLevel: any;
  maximumPromotionLevel: any;
  itemId:any;
  providerId: any;
  isActive: any;
  expire: string;
}

@Component({
  selector: 'app-promotion',
  templateUrl: './promotion.component.html',
  styleUrls: ['./promotion.component.scss']
})
export class PromotionComponent implements OnInit {

  ELEMENT_DATA: ResourceElement[] = [];
  deleteElement: any = { name: '', promotionId: 0 };

  pageNumber:PageNumber = new PageNumber();

  nextCount: number = 1;

  access:string = '';
  itemNameList:any;
  providers: ProviderInfo;
  getProviderId:any;

  providerType:any;
  providerId:any;

  isActive: any;

  setFilterPromotion: FilterPromotionDto = new FilterPromotionDto();

  filterPromotion = new FormGroup({
    providerId: new FormControl(),
    itemId: new FormControl(),
  });

  promotionList: any = {
    isActive: '',
  };

  constructor(
    private resourceService: ResourceService,
    private session: SessionService,
    private permissionService: PermissionService,
    private itemService: ItemService,
    private DiscountService: DiscountService,
    private promotionService: PromotionService,
    ) { }

  ngOnInit(): void {

    this.pageNumber.pageNumber = this.nextCount;

    this.session.sessionCheck();
    this.providerId = localStorage.getItem('providerId');

    if (this.providerId == 0) {
      this.providerType = true;
    } else if (this.providerId !== 0) {
      this.providerType = false;

      this.getProviderId = this.providerId;

      this.onGetItemnNameList(this.providerId);
    }

    // this.onGetAllPermission(this.pageNumber);

    this.onGetProviderList();

    this.setFilterPromotion.providerId = null;
    this.setFilterPromotion.itemId = null;
    this.setFilterPromotion.pageNumber = 1;

    this.getDefaultAllPromotion(this.setFilterPromotion);

  }

  displayedColumns: string[] = ['promotionId','minimumOrderLevel', 'maximumPromotionLevel','itemId','providerId','isActive','expire'];
  dataSource = this.ELEMENT_DATA;

  onSubmit(){

    if(this.providerId == 0){
      this.setFilterPromotion.providerId = Number(this.filterPromotion.value.providerId);
    }else if(this.providerId !== 0 ){
      this.setFilterPromotion.providerId = Number(this.providerId);
    }

    this.setFilterPromotion.itemId = Number(this.filterPromotion.value.itemId);
    this.setFilterPromotion.pageNumber = 1;

    console.log(this.setFilterPromotion);

    this.promotionService.getAllPromotion(this.setFilterPromotion).subscribe((res) =>{
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      this.onClear();
    })

  }

  getDefaultAllPromotion(value){
    this.promotionService.getAllPromotion(value).subscribe((res) => {
      
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      console.log(res);
    })
  }

  onClear(){

    this.filterPromotion.reset();

    this.setFilterPromotion.providerId = null;
    this.setFilterPromotion.itemId = null;
    this.setFilterPromotion.pageNumber = 1;

    this.getDefaultAllPromotion(this.setFilterPromotion);

  }

  expirePromotion(value){
    console.log(value);

    this.deleteElement.promotionId = value.promotionId;

    
  }

onExpirePromotion(){
  this.promotionService.expirePromoCode(this.deleteElement.promotionId).subscribe((res) => {
    console.log(res);

    this.ELEMENT_DATA = res.data;
    this.dataSource = this.ELEMENT_DATA;

  })
}

  

  onPreviewButton(){

    let i = 0;

    i--;

    if (this.nextCount != 1) {
      this.nextCount += i;
      // console.log(this.nextCount);
    }

    // this.pageNumber.pageNumber = this.nextCount;

    // this.permissionService.getAllPermission(this.pageNumber).subscribe((res) =>{
    //   console.log(res.data);
    //   let data = res.data;
    //   this.ELEMENT_DATA = res.data;
    //   this.dataSource = this.ELEMENT_DATA;

    //   // if(res.data.access == 1){
    //   //   this.access = 'Yes';
    //   // }else if(res.data.access == 0){
    //   //   this.access = 'No';
    //   // }
      
    // })

  }

  onNextButton(){
    let i = 0;

    i++;

    this.nextCount += i;

    this.pageNumber.pageNumber = this.nextCount;

    // this.permissionService.getAllPermission(this.pageNumber).subscribe((res) =>{
    //   console.log(res.data);
    //   let data = res.data;
    //   this.ELEMENT_DATA = res.data;
    //   this.dataSource = this.ELEMENT_DATA;

    //   // if(res.data.access == 1){
    //   //   this.access = 'Yes';
    //   // }else if(res.data.access == 0){
    //   //   this.access = 'No';
    //   // }
      
    // })
  }

  onGetProviderList(){
    this.itemService.getProviders().subscribe((res) => {
      console.log(res);

      this.providers = res.data;
      console.log(this.providers);
    })
  }

  onProviderTypeSelectd(value){
    this.DiscountService.getItemByProviderId(value).subscribe((res) =>{
      console.log(res);

      this.itemNameList = res.data;

      this.getProviderId = value;

      console.log(this.itemNameList);
    })
  }

  onGetItemnNameList(value){
    this.DiscountService.getItemByProviderId(value).subscribe((res) =>{
      console.log(res);

      this.itemNameList = res.data;

      this.getProviderId = value;

      // console.log(this.itemNameList);
    });
  }

}

