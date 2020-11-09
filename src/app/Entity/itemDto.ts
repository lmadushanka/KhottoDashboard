import { ItemValues } from './itemValues';

export class ItemDto {
  itemId:any;
  itemTypeId: any;
  price: any;
  providerId: any;
  serviceUserId: any;
  itemOptionValues: number[];
  itemValues: ItemValues[];
  itemName: string;
  simpleDescription:string;
}
