import { Facility } from 'src/app/entity/facility';
import { Policy } from 'src/app/entity/policy';
import { OpenDays } from 'src/app/entity/open-days';

export class Provider {
  name: string;
  providerType: string;
  location: string;
  address: string;
  businessRegNo:any;
  nicNo:any;
  phone: string;
  category: number;
  luxuryCategory: number;
  taxRate: number;
  serviceCharge: number;
  mapUrl: string;
  logoImage: File;
  coverImage: File;
  bannerImage: File;
  simpleDescription: string;
  facility: Facility[];
  policy: Policy[];
  openDays: OpenDays[];
  freeCancelationDateCount:any;
}
