import { MinMaxDate } from 'src/app/Entity/minMaxDate';
import { MinMaxPrice } from 'src/app/Entity/minMaxPrice';
export class FilterOrderDto {
    orderId:number;
    mobileNumber:number;
    customerRequestedOrderAt:any;
    providerId:number;
    dateInfo: MinMaxDate;
    priceInfo: MinMaxPrice;
    pageNumber:number;
  }
  