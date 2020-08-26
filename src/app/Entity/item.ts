import { Term } from './term';

export class Item {
  type: string;
  name: string;
  price: string;
  coverImage: File;
  description: string;
  terms: Term[];
  availability:string;
}
