import { MinMaxDate } from 'src/app/Entity/minMaxDate';
import { PageNumber } from 'src/app/Entity/pageNumber';
export class FilterSmsDto {
    date:any = {
      min: '',
      max: '',
    }
    pageNumber:any;
  }