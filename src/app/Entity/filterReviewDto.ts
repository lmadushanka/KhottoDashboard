export class FilterReviewDto {
    approvedStatus:any;
    reviewType:any;
    reviewFor:any;
    isSpam:any;
    date:any = {
      min: '',
      max: '',
    }
    pageNumber:any;
  }