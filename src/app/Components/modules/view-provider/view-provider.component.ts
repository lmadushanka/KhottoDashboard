import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OpenDays } from 'src/app/entity/open-days';
import { Facility } from 'src/app/entity/facility';
import { Policy } from 'src/app/entity/policy';
import { Provider } from 'src/app/entity/provider';
import { ProviderService } from 'src/app/services/provider/provider.service';

@Component({
  selector: 'app-view-provider',
  templateUrl: './view-provider.component.html',
  styleUrls: ['./view-provider.component.scss'],
})
export class ViewProviderComponent implements OnInit {

  public imagePathLogo;
  public imagePathCover;
  public imagePathBanner;
  imgURLLogo: any;
  imgURLCover: any;
  imgURLBanner: any;

  facilities: Facility[];
  policies: Policy[];
  days: OpenDays[];
  newProvider: Provider = new Provider();




  addProviderForm = new FormGroup({
    name: new FormControl(),
    providerType: new FormControl(),
    location: new FormControl(),
    address: new FormControl(),
    phone: new FormControl(),
    categoryType: new FormControl(),
    luxuryType: new FormControl(),
    taxRate: new FormControl(),
    serviceCharge: new FormControl(),
    mapUrl: new FormControl(),
    description: new FormControl(),
    logo: new FormControl(),
    cover: new FormControl(),
    banner: new FormControl(),
  });

  logoFile: File = null;
  coverFile: File = null;
  bannerFile: File = null;

  logoIf: boolean = false;
  coverIf: boolean = false;
  bannerIf: boolean = false;

  categoryList = [];
  categoryShow: boolean = false;

  luxuryList = [
    { name: 'රු', value: 1 },
    { name: 'රුරු', value: 2 },
    { name: 'රුරුරු', value: 3 },
    { name: 'රුරුරුරු', value: 4 },
    { name: 'රුරුරුරුරු', value: 5 },
  ];

  dayList: OpenDays[] = [];

  facilityArray: Facility[] = [];
  policyArray: Policy[] = [];

  errFacility: any = { show: false, value: 'Enter details... !' };
  errPolicy: any = { show: false, value: 'Enter details... !' };

  @Input() providerId: string;

  provider: string;

  setProviderId:any;

  providerDetails:any = {
    providerName: '',
    providerTypeName: '',
    locationName: '',
    address: '',
    callNumber: '',
    categoryName: '',
    luxuryCategory: '',
    taxRate: '',
    serviceCharge: '',
    mapUrl: '',
    simpleDescription: '',
    logoImage: '',
    coverImage: '',
    bannerImage: '',
    
  }

  luxuryCategoryName ='';

  constructor(
    private providerService: ProviderService
  ) {}

  ngOnInit() {

    this.setProviderId = localStorage.getItem('viewProviderId');

    this.onGetProviderById(this.setProviderId);

  }

  onGetProviderById(value){
    this.providerService.getProviderViewById(value).subscribe((res) =>{
      console.log(res);
      this.providerDetails =res.data;

      if(Number(this.providerDetails.luxuryCategory) == 1){
        this.luxuryCategoryName = 'රු';
      }
      if(Number(this.providerDetails.luxuryCategory) == 2){
        this.luxuryCategoryName = 'රුරු';
      }
      if(Number(this.providerDetails.luxuryCategory) == 3){
        this.luxuryCategoryName = 'රුරුරු';
      }
      if(Number(this.providerDetails.luxuryCategory) == 4){
        this.luxuryCategoryName = 'රුරුරුරු';
      }
      if(Number(this.providerDetails.luxuryCategory) == 5){
        this.luxuryCategoryName = 'රුරුරුරුරු';
      }
      if(Number(this.providerDetails.luxuryCategory) == 6){
        this.luxuryCategoryName = 'රුරුරුරුරුරු';
      }

      this.dayList = res.data.openDays;

    })
  }

}
