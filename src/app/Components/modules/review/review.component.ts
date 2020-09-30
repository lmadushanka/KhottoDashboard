import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user/user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/Services/session/session.service';
import { FilterReviewDto } from 'src/app/Entity/filterReviewDto';
import { ReviewService } from 'src/app/Services/review/review.service';
import { ItemService } from 'src/app/Services/Item/item.service';
import { DiscountService } from 'src/app/Services/discount/discount.service';

export interface PeriodicElement {
  reviewId: number;
  reviewerName: string;
  reviewText: any;
  approvedStatus: string;
  isSpam: string;
  setAproved: string;
  setSpam: string;
}

const ELEMENT_DATA: PeriodicElement[] = [];


@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  ELEMENT_DATA: PeriodicElement[] = [];
  spamElement: any = { reviewId: 0};
  aprovedElement: any = {reviewId: 0};


  filterReviewForm = new FormGroup({
    approvedStatus: new FormControl(),
    reviewType: new FormControl(),
    reviewFor: new FormControl(),
    reviewFor2: new FormControl(),
    isSpam: new FormControl(),
    minDate: new FormControl(),
    maxDate: new FormControl(),
    provider: new FormControl(),
  });


  approvedStatus = [
    { title: 'Yes', value: 1 },
    { title: 'No', value: 0 },
  ]

  isSpam = [
    { title: 'Yes', value: 1 },
    { title: 'No', value: 0 },
  ]

  reviewFor = [
    { title: 'Yes', value: 1 },
    { title: 'No', value: 0 },
  ]

  reviewType = [
    { title: 'Provider', value: 'p' },
    { title: 'Item', value: 'i' },
  ]

  newSpamReview:any = {
    isSpam: '',
    serviceUserId: '',
  }

  setNewApprovedReview:any = {
    isApproved: '',
    serviceUserId: '',
  }
  setFilterReview: FilterReviewDto = new FilterReviewDto();

  constructor(
    private session: SessionService,
    private userService: UserService,
    private reviewService: ReviewService,
    private ItemService: ItemService,
    private DiscountService: DiscountService,
    ) { }

    displayedColumns: string[] = [
      'reviewId',
      'reviewerName',
      'reviewText',
      'approvedStatus',
      'isSpam',
      'setAproved',
      'setSpam',
    ];

    dataSource = ELEMENT_DATA;

    providerId:any;
    providerType:any;
    provider:any;

    reviewForType:any;

    providerReviewForType:any

    serviceUserId:any;



    getProviderId:any;

    itemNameList:any;

    providerList:any

  ngOnInit(): void {

    this.session.sessionCheck();
    this.providerId = localStorage.getItem('providerId');

    this.serviceUserId = localStorage.getItem('serviceUserId');

    if (this.providerId == 0) {
      this.providerType = false;
      this.reviewForType = false;
      this.providerReviewForType = true;

    } else if (this.providerId !== 0) {
      this.providerType = false;
      this.reviewForType = false;
      this.providerReviewForType = false;
    }

    this.getProviderList();

    this.setFilterReview.approvedStatus = null;
    this.setFilterReview.isSpam = 0;
    this.setFilterReview.reviewType = null;
    this.setFilterReview.reviewFor = null;
    this.setFilterReview.date.min = null;
    this.setFilterReview.date.max = null;
    this.setFilterReview.pageNumber = 1;

    console.log(this.setFilterReview);

    this.reviewService.getFilterReview(this.setFilterReview).subscribe((res) =>{
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    });
    
  }

  onSubmit(){
    
    this.setFilterReview.approvedStatus = Number(this.filterReviewForm.value.approvedStatus);
    this.setFilterReview.reviewType = this.filterReviewForm.value.reviewType;

    if (this.providerId == 0) {
      if(this.setFilterReview.reviewType == 'i'){
        this.setFilterReview.reviewFor = this.filterReviewForm.value.reviewFor;
      }else if(this.setFilterReview.reviewType == 'p'){
        this.setFilterReview.reviewFor = Number(this.filterReviewForm.value.reviewFor2);
      }
      

    } else if (this.providerId !== 0) {

      if(this.setFilterReview.reviewType == 'i'){
        this.setFilterReview.reviewFor = this.filterReviewForm.value.reviewFor;
      }else if(this.setFilterReview.reviewType == 'p'){
        this.setFilterReview.reviewFor = Number(this.providerId);
      }

    }


    this.setFilterReview.isSpam = Number(this.filterReviewForm.value.isSpam);
    this.setFilterReview.date.min = this.filterReviewForm.value.minDate;
    this.setFilterReview.date.max = this.filterReviewForm.value.maxDate;
    this.setFilterReview.pageNumber = 1;

    console.log(this.setFilterReview);

    this.reviewService.getFilterReview(this.setFilterReview).subscribe((res) =>{
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    })
    
  }

  onClear(){
    this.filterReviewForm.reset();

    this.setFilterReview.approvedStatus = null;
    this.setFilterReview.isSpam = 0;
    this.setFilterReview.reviewType = null;
    this.setFilterReview.reviewFor = null;
    this.setFilterReview.date.min = null;
    this.setFilterReview.date.max = null;
    this.setFilterReview.pageNumber = 1;

    console.log(this.setFilterReview);

    this.reviewService.getFilterReview(this.setFilterReview).subscribe((res) =>{
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    });
  }

  // promotionType(value){
  //   this.DiscountService.getItemByProviderId(value).subscribe((res) =>{
  //     console.log(res);

  //     this.itemNameList = res.data;

  //     this.getProviderId = value;

  //     console.log(this.itemNameList);
  //   })
  // }

  getProviderList(){
    this.ItemService.getProviders().subscribe((res) => {
      this.provider = res.data;
      console.log(res);
    });
  }

  clickReviewType(value){

    if(value == 'i'){

      if (this.providerId == 0) {
        this.providerType = true;
        this.reviewForType = true;
      } else if (this.providerId !== 0) {
        this.providerType = false;
        this.reviewForType = true

        this.DiscountService.getItemByProviderId(this.providerId).subscribe((res) =>{
          console.log(res);
    
          this.itemNameList = res.data;
    
          this.getProviderId = value;
    
          console.log(this.itemNameList);
        })
      }

      this.providerReviewForType = false;

    }else if(value == 'p'){

      this.providerType = false;

      if (this.providerId == 0) {
        this.providerReviewForType = true;
        this.reviewForType = false;

        this.ItemService.getProviders().subscribe((res) => {
          this.providerList = res.data;
          console.log(res);
        });

      }else if(this.providerId !== 0){
        this.reviewForType = false;
      }

    }
    
  }

  clickProvider(value){
    this.DiscountService.getItemByProviderId(value).subscribe((res) =>{
      console.log(res);

      this.itemNameList = res.data;

      this.getProviderId = value;

      console.log(this.itemNameList);
    });
  }

  setReviewSpam(value){
    this.spamElement.reviewId = value.reviewId;
  }

  spamReview(){
    this.newSpamReview.isSpam = 1
    this.newSpamReview.serviceUserId = Number(this.serviceUserId);

    this.reviewService.setSapmReview(this.spamElement.reviewId, this.newSpamReview).subscribe((res) => {
      console.log(res);

      this.onClear();
    })
  }

  setReviewAproved(value){
    this.aprovedElement.reviewId = value.reviewId;
  }

  aprovedReview(){
    this.setNewApprovedReview.isApproved = 1;
    this.setNewApprovedReview.serviceUserId = Number(this.serviceUserId);

    this.reviewService.setApprovedReview(this.aprovedElement.reviewId , this.setNewApprovedReview).subscribe((res) =>{
      console.log(res);
      this.onClear();
    })
    
  }
  

}

