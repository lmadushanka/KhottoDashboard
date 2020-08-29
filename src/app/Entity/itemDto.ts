import { ItemValues } from './itemValues';

export class ItemDto {
  itemTypeId: any;
  price: any;
  providerId: any;
  serviceUserId: any;
  itemOptionValues: number[];
  itemValues: ItemValues[];
  itemName: string;
  simpleDescription:string;
}
