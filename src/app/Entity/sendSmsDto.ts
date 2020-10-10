import {SmsDto} from 'src/app/Entity/smsDto';
export class SendSmsDto {
    smsText:any;
    recipients: SmsDto[] = [];
    serviceUserId:any;
  }
  