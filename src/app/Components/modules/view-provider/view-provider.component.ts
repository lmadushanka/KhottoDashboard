import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { OpenDays } from 'src/app/entity/open-days';
import { Facility } from 'src/app/entity/facility';
import { Policy } from 'src/app/entity/policy';
import { Provider } from 'src/app/entity/provider';

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

  providerTypeList = [
    { name: 'Resturent', value: 1 },
    { name: 'Hotel', value: 2 },
  ];

  categoryList = [];
  categoryShow: boolean = false;

  luxuryList = [
    { name: 'රු', value: 1 },
    { name: 'රුරු', value: 2 },
    { name: 'රුරුරු', value: 3 },
    { name: 'රුරුරුරු', value: 4 },
    { name: 'රුරුරුරුරු', value: 5 },
  ];

  dayList: OpenDays[] = [
    { day: 'Monday', isOpen: false, hours: '00:00-00:00' },
    { day: 'Tuesday', isOpen: false, hours: '00:00-00:00' },
    { day: 'Wednesday', isOpen: false, hours: '00:00-00:00' },
    { day: 'Thursday', isOpen: false, hours: '00:00-00:00' },
    { day: 'Friday', isOpen: false, hours: '00:00-00:00' },
    { day: 'Saturday', isOpen: false, hours: '00:00-00:00' },
    { day: 'Sunday', isOpen: false, hours: '00:00-00:00' },
  ];

  baseDayList: OpenDays[] = [
    { day: 'Monday', isOpen: false, hours: '00:00-00:00' },
    { day: 'Tuesday', isOpen: false, hours: '00:00-00:00' },
    { day: 'Wednesday', isOpen: false, hours: '00:00-00:00' },
    { day: 'Thursday', isOpen: false, hours: '00:00-00:00' },
    { day: 'Friday', isOpen: false, hours: '00:00-00:00' },
    { day: 'Saturday', isOpen: false, hours: '00:00-00:00' },
    { day: 'Sunday', isOpen: false, hours: '00:00-00:00' },
  ];

  facilityArray: Facility[] = [];
  policyArray: Policy[] = [];

  errFacility: any = { show: false, value: 'Enter details... !' };
  errPolicy: any = { show: false, value: 'Enter details... !' };

  @Input() providerId: string;

  provider: string;

  constructor() {}

  ngOnInit() {
    this.provider = this.providerId;
    console.log(this.provider);
  }

  onLogoSelected(event) {
    if (event.target.files.length === 0) return;

    var reader = new FileReader();
    this.imagePathLogo = event.target.files;
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgURLLogo = reader.result;
    };

    this.logoIf = false;

    var file: File = <File>event.target.files[0];
    this.logoFile = file;
    this.newProvider.logoImage = this.logoFile;
  }

  onCoverSelected(event) {
    if (event.target.files.length === 0) return;

    var reader = new FileReader();
    this.imagePathCover = event.target.files;
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgURLCover = reader.result;
    };

    this.coverIf = false;

    var file: File = <File>event.target.files[0];
    this.coverFile = file;
    this.newProvider.coverImage = this.coverFile;
  }

  onBannerSelected(event) {
    if (event.target.files.length === 0) return;

    var reader = new FileReader();
    this.imagePathBanner = event.target.files;
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgURLBanner = reader.result;
    };

    this.bannerIf = false;

    var file: File = <File>event.target.files[0];
    this.bannerFile = file;
    this.newProvider.bannerImage = this.bannerFile;
  }

  addFacility(title, description) {
    if (title != '' || description != '') {
      this.facilityArray.push({
        title: title,
        description: description,
      });
      let t = <HTMLInputElement>document.getElementById('facilityTitle');
      let d = <HTMLInputElement>document.getElementById('facilityDescription');
      t.value = '';
      d.value = '';
    } else {
      this.errFacility.show = true;
    }
  }

  addPolicy(title, description) {
    if (title != '' || description != '') {
      this.policyArray.push({
        title: title,
        description: description,
      });
      let t = <HTMLInputElement>document.getElementById('policyTitle');
      let d = <HTMLInputElement>document.getElementById('policyDescription');
      t.value = '';
      d.value = '';
    } else {
      this.errPolicy.show = true;
    }
  }

  removeFacility(i) {
    this.facilityArray.splice(i, 1);
  }

  removePolicy(i) {
    this.policyArray.splice(i, 1);
  }

  updateIsOpen(day, i) {
    let d = <HTMLInputElement>document.getElementById(day);
    let value = d.checked;
    this.dayList[i].isOpen = value;
  }

  updateTime(day, type, i) {
    if (type == 'Open') {
      let o = <HTMLInputElement>document.getElementById(day + type);
      var value: string = o.value;

      var openStr: string = this.dayList[i].hours.slice(0, 5);
      var closeStr: string = this.dayList[i].hours.slice(-5);
      var newTime: string = value + '-' + closeStr;

      this.dayList[i].hours = newTime;
    }

    if (type == 'Close') {
      let c = <HTMLInputElement>document.getElementById(day + type);
      var value: string = c.value;

      var openStr: string = this.dayList[i].hours.slice(0, 5);
      var closeStr: string = this.dayList[i].hours.slice(-5);
      var newTime: string = openStr + '-' + value;

      this.dayList[i].hours = newTime;
    }
  }

  resetForm() {
    this.addProviderForm.reset();
    this.dayList = this.baseDayList;
    this.facilityArray = [];
    this.facilities = this.facilityArray;
    this.policyArray = [];
    this.policies = this.policyArray;
    this.categoryList = [];
    this.categoryShow = false;
    this.logoFile = null;
    this.coverFile = null;
    this.bannerFile = null;
    this.imgURLLogo = null;
    this.imgURLCover = null;
    this.imgURLBanner = null;
    this.newProvider.logoImage = null;
    this.newProvider.coverImage = null;
    this.newProvider.bannerImage = null;
    this.logoIf = false;
    this.coverIf = false;
    this.bannerIf = false;
  }

  onClear() {
    this.addProviderForm.reset();
    this.dayList = this.baseDayList;
    this.facilityArray = [];
    this.facilities = this.facilityArray;
    this.policyArray = [];
    this.policies = this.policyArray;
    this.categoryList = [];
    this.categoryShow = false;
    this.logoFile = null;
    this.coverFile = null;
    this.bannerFile = null;
    this.imgURLLogo = null;
    this.imgURLCover = null;
    this.imgURLBanner = null;
    this.newProvider.logoImage = null;
    this.newProvider.coverImage = null;
    this.newProvider.bannerImage = null;
    this.logoIf = false;
    this.coverIf = false;
    this.bannerIf = false;
  }
}
