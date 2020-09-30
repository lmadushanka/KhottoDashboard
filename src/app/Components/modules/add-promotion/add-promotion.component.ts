import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/Services/session/session.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ItemService } from 'src/app/Services/Item/item.service';
import { ProviderInfo } from '../../../Entity/providerInfo';
import { DiscountService } from 'src/app/Services/discount/discount.service';
import { PromotionDto } from 'src/app/Entity/promotionDto';
import { PromotionService } from 'src/app/Services/promotion/promotion.service';

@Component({
  selector: 'app-add-promotion',
  templateUrl: './add-promotion.component.html',
  styleUrls: ['./add-promotion.component.scss']
})
export class AddPromotionComponent implements OnInit {

  applideForDiscount = [
    { title: 'Yes', value: 1 },
    { title: 'No', value: 0 },
  ];

  oneAtATimeLock = [
    { title: 'Yes', value: 1 },
    { title: 'No', value: 0 },
  ];

  isCombinedToPromoCode = [
    { title: 'Yes', value: 1 },
    { title: 'No', value: 0 },
  ]

  isGiveAwayPromotion = [
    { title: 'Yes', value: 1 },
    { title: 'No', value: 0 },
  ]

  isLoyaltyPromo = [
    { title: 'Yes', value: 1 },
    { title: 'No', value: 0 },
  ]

  isTransferable = [
    { title: 'Yes', value: 1 },
    { title: 'No', value: 0 },
  ]

  isPromotionTypeSelect = [
    { title: 'Percentage Off Promotion', value: 0 },
    { title: 'Fixed Off Promotion', value: 1 },
    { title: 'Promo Code For Whole Bill Fixed Off Promotion', value: 2},
    { title: 'Promo Code For Whole Bill Percentage Off Promotion', value: 3 },
    { title: 'Buy And Get Free Promotion', value: 4 },
    { title: 'Come Back Promo Code  For Whole Bill Fixed Off Promotion', value: 5 },
  ]

  addPromoCodeDto:any = {
    promoCode: '',
    promotionId: '',
    usableCount: '',
    leftUsableCount: '',
    isTransferable: '',
    serviceUserId: '',
  }


  serviceUserId:any;

  providers: ProviderInfo;
  providerType:any;
  providerId:any;
  getProviderId:any;

  itemNameList:any;

  addNewPromotion: PromotionDto = new PromotionDto();

  // newCategory: Category = new Category();
  // addCategoryDto: AddCategoryDto = new AddCategoryDto();
  // categoryDto: CategoryDto = new CategoryDto();
  //  newPermission: AddPermissionDto = new AddPermissionDto()

  addPromotionForm = new FormGroup({
    resourceId: new FormControl(),
    providerId: new FormControl(),
    minimumOrderPriceLevel: new FormControl(),
    maximumPromotionPriceLevel: new FormControl(),
    itemId: new FormControl(),
    applideForDiscount: new FormControl(),
    percentageOff: new FormControl(),
    fixedOff: new FormControl(),
    oneAtATimeLock: new FormControl(),
    startDate: new FormControl(),
    endDate: new FormControl(),
    isCombinedToPromoCode: new FormControl(),
    isGiveAwayPromotion: new FormControl(),
    originalItemCount: new FormControl(),
    giveAwayItemId: new FormControl(),
    giveAwayItemCount: new FormControl(),
    isLoyaltyPromo: new FormControl(),
    promotionDescription: new FormControl(),
    promoCode: new FormControl(),
    usableCount: new FormControl(),
    leftUsableCount: new FormControl(),
    isTransferable: new FormControl()
  });

  percentageOff:boolean = true;
  fixedOff:boolean = true;
  CombinedToPromoCode: boolean = true;
  GiveAwayPromotion: boolean = true;
  itemPurchaseCountForGiveAway: boolean = true;
  giveAwayItemId: boolean = true;
  giveAwayItemCount: boolean = true;
  LoyaltyPromo: boolean = true;

  setPromoCode: boolean = true;



  

  constructor(
    private session: SessionService,
    private router: Router,
    private itemService: ItemService,
    private DiscountService: DiscountService,
    private promotionService: PromotionService,
    ) { }

  ngOnInit(): void {

    this.session.sessionCheck();
    this.providerId = localStorage.getItem('providerId');

    if (this.providerId == 0) {
      this.providerType = true;
    } else if (this.providerId !== 0) {
      this.providerType = false;

      this.getProviderId = this.providerId;

      this.onGetItemnNameList(this.providerId);
    }

    this.onGetProviderList();
  }

  onSubmit(){

    this.addNewPromotion.assignedBy = this.getProviderId;
    this.addNewPromotion.minimumOrderLevel = this.addPromotionForm.value.minimumOrderPriceLevel;
    this.addNewPromotion.maximumPromotionLevel = this.addPromotionForm.value.maximumPromotionPriceLevel;
    this.addNewPromotion.itemId = Number(this.addPromotionForm.value.itemId);
    this.addNewPromotion.providerId = this.getProviderId;
    this.addNewPromotion.isAppliedForDiscountedItem = Number(this.addPromotionForm.value.applideForDiscount);
    this.addNewPromotion.percentageOff = this.addPromotionForm.value.percentageOff;
    this.addNewPromotion.fixedOff = this.addPromotionForm.value.fixedOff;
    this.addNewPromotion.oneAtATimeLock = Number(this.addPromotionForm.value.oneAtATimeLock);
    this.addNewPromotion.startDate = this.addPromotionForm.value.startDate;
    this.addNewPromotion.endDate = this.addPromotionForm.value.endDate;
    this.addNewPromotion.createdBy = Number(localStorage.getItem('serviceUserId'));
    this.addNewPromotion.isCombinedToPromoCode = Number(this.addPromotionForm.value.isCombinedToPromoCode);
    this.addNewPromotion.isGiveAwayPromotion = Number(this.addPromotionForm.value.isGiveAwayPromotion);
    this.addNewPromotion.itemPurchaseCountForGiveAway = this.addPromotionForm.value.originalItemCount;
    this.addNewPromotion.giveAwayItemId = Number(this.addPromotionForm.value.giveAwayItemId);
    this.addNewPromotion.giveAwayItemCount = this.addPromotionForm.value.giveAwayItemCount;
    this.addNewPromotion.isLoyaltyPromo = this.addPromotionForm.value.isLoyaltyPromo;
    this.addNewPromotion.promotionDescription = this.addPromotionForm.value.promotionDescription;

    console.log(this.addNewPromotion);

    this.promotionService.addPromotion(this.addNewPromotion).subscribe((res) =>{
      console.log(res);

      this.onClear();

      this.router.navigateByUrl('/promotion');
    })


    this.addPromoCodeDto.promoCode = this.addPromotionForm.value.promoCode;

  }

  promotionType(value){
    console.log(value);

    if (value == 0) {
      this.fixedOff = false;
      this.CombinedToPromoCode = false;
      this.GiveAwayPromotion = false;
      this.itemPurchaseCountForGiveAway = false;
      this.giveAwayItemId = false;
      this.giveAwayItemCount = false;
      this.LoyaltyPromo = false;
      this.percentageOff = true;
      this.setPromoCode = false;
    }else if(value == 1){
      this.percentageOff = false;
      this.CombinedToPromoCode = false;
      this.GiveAwayPromotion = false;
      this.itemPurchaseCountForGiveAway = false;
      this.giveAwayItemId = false;
      this.giveAwayItemCount = false;
      this.LoyaltyPromo = false;
      this.fixedOff = true;
      this.setPromoCode = false;
    }else if(value == 2){
      this.fixedOff = false;
      this.percentageOff = true;
      this.GiveAwayPromotion = false;
      this.itemPurchaseCountForGiveAway = false;
      this.giveAwayItemId = false;
      this.giveAwayItemCount = false;
      this.LoyaltyPromo = false;
      this.CombinedToPromoCode = true;
      this.setPromoCode = true;
    }else if(value == 3){
      this.fixedOff = true;
      this.percentageOff = false;
      this.GiveAwayPromotion = false;
      this.itemPurchaseCountForGiveAway = false;
      this.giveAwayItemId = false;
      this.giveAwayItemCount = false;
      this.LoyaltyPromo = false;
      this.setPromoCode = true;
    }else if(value == 4){

      this.fixedOff = false;
      this.percentageOff = false;
      this.CombinedToPromoCode = false;
      this.GiveAwayPromotion = true;
      this.itemPurchaseCountForGiveAway = true;
      this.giveAwayItemId = true;
      this.giveAwayItemCount = true;
      this.LoyaltyPromo = false;
      this.setPromoCode = false;

    }else if(value == 5){

      this.percentageOff = false;
      this.GiveAwayPromotion = false;
      this.itemPurchaseCountForGiveAway = false;
      this.giveAwayItemId = false;
      this.giveAwayItemCount = false;
      this.fixedOff = true;
      this.CombinedToPromoCode = true;
      this.LoyaltyPromo = true;
      this.setPromoCode = true;
      
    }

  }

  onClear(){
    this.addPromotionForm.reset();
    
    this.percentageOff = true;
    this.fixedOff = true;
    this.CombinedToPromoCode = true;
    this.GiveAwayPromotion = true;
    this.itemPurchaseCountForGiveAway = true;
    this.giveAwayItemId = true;
    this.giveAwayItemCount = true;
    this.LoyaltyPromo = true;
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
