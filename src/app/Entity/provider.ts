import { Facility } from 'src/app/Entity/facility';
import { Policy } from 'src/app/Entity/policy';
import { OpenDays } from 'src/app/Entity/open-days';

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
  serviceChargeRate: number;
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
