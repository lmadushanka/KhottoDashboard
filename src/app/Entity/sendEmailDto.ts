import {EmailDto} from 'src/app/Entity/emailDto';
export class SendEmailDto {
    emailSubject:any;
    emailBody:any;
    recipients: EmailDto[] = [];
    serviceUserId:any;
  }