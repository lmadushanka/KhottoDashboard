import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { SessionService } from 'src/app/Services/session/session.service';
import { Provider } from 'src/app/Entity/provider';
import { Facility } from 'src/app/Entity/facility';
import { Policy } from 'src/app/Entity/policy';
import { OpenDays } from 'src/app/Entity/open-days';
import { ProviderService } from 'src/app/Services/provider/provider.service';
import { ProviderValues } from 'src/app/Entity/providerValues';
import { AddProviderDto } from 'src/app/Entity/addProviderDto';
import { ProviderInfo } from 'src/app/Entity/providerInfo';
import { CategoryService } from 'src/app/Services/category/category.service';
import { Router } from '@angular/router';
import { utf8Encode } from '@angular/compiler/src/util';

@Component({
  selector: 'app-edit-provider',
  templateUrl: './edit-provider.component.html',
  styleUrls: ['./edit-provider.component.scss'],
})
export class EditProviderComponent implements OnInit {
  //For Images
  public imagePathLogo;
  public imagePathCover;
  public imagePathBanner;
  imgURLLogo: any;
  imgURLCover: any;
  imgURLBanner: any;

  //Others
  newProvider: Provider = new Provider();
  facilities: Facility[];
  policies: Policy[];
  days: OpenDays[];
  addProviderDto: AddProviderDto = new AddProviderDto();
  providerValues: ProviderValues[] = [];
  providerInfo: ProviderInfo = new ProviderInfo();

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
    nic: new FormControl(),
    BRNumber: new FormControl(),
    district: new FormControl(),
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

  districtList = [];

  locationList = [];

  categoryList: any;
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

  providerDetails: any = {
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
    businessRegNo: '',
    categoryId: '',
  };

  luxuryCategoryName = '';

  setProviderId: any;

  ProviderTypeSelected = '';
  categorySelected = '';

  luxuryCategorySelected = '';

  constructor(
    private session: SessionService,
    private providerService: ProviderService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.session.sessionCheck();

    this.onGetAllDistricts();

    this.setFacility();
    this.setPolicy();

    this.setProviderId = localStorage.getItem('viewProviderId');

    this.onGetProviderById(this.setProviderId);
  }

  

  onSubmit() {

    
    var nullIf: boolean = true;

    if (this.newProvider.logoImage == null) {
      this.logoIf = true;
      nullIf = false;
    }

    if (this.newProvider.coverImage == null) {
      this.coverIf = true;
      nullIf = false;
    }

    if (this.newProvider.coverImage == null) {
      this.bannerIf = true;
      nullIf = false;
    }

    this.newProvider.name = this.addProviderForm.value.name;
    this.newProvider.providerType = this.addProviderForm.value.providerType;
    this.newProvider.location = this.addProviderForm.value.location;
    this.newProvider.address = this.addProviderForm.value.address;
    this.newProvider.phone = this.addProviderForm.value.phone;
    this.newProvider.category = this.addProviderForm.value.categoryType;
    this.newProvider.luxuryCategory = this.addProviderForm.value.luxuryType;
    this.newProvider.taxRate = this.addProviderForm.value.taxRate;
    this.newProvider.serviceCharge = this.addProviderForm.value.serviceCharge;
    this.newProvider.mapUrl = this.addProviderForm.value.mapUrl;
    this.newProvider.simpleDescription = this.addProviderForm.value.description;
    this.newProvider.businessRegNo = this.addProviderForm.value.BRNumber;
    this.newProvider.nicNo = this.addProviderForm.value.nic;

    if (this.newProvider.name == null || this.newProvider.name == '') {
      nullIf = false;
    }

    if (
      this.newProvider.providerType == null ||
      this.newProvider.providerType == ''
    ) {
      nullIf = false;
    }

    if (this.newProvider.location == null || this.newProvider.location == '') {
      nullIf = false;
    }

    if (this.newProvider.address == null || this.newProvider.address == '') {
      nullIf = false;
    }

    if (this.newProvider.phone == null || this.newProvider.phone == '') {
      nullIf = false;
    }
    if (this.newProvider.category == null) {
      nullIf = false;
    }

    if (this.newProvider.luxuryCategory == null) {
      nullIf = false;
    }

    if (this.newProvider.taxRate == null) {
      nullIf = false;
    }

    if (this.newProvider.serviceCharge == null) {
      nullIf = false;
    }

    if (this.newProvider.mapUrl == null || this.newProvider.mapUrl == '') {
      nullIf = false;
    }

    if (
      this.newProvider.simpleDescription == null ||
      this.newProvider.simpleDescription == ''
    ) {
      nullIf = false;
    }

    if (nullIf == true) {
      var _this = this;
      let serviceUserId = localStorage.getItem('serviceUserId');

      if (this.facilityArray.length != 0) {
        this.facilities = this.facilityArray;
      }

      if (this.policyArray.length != 0) {
        this.policies = this.policyArray;
      }

      this.days = this.dayList;

      // FORM SUBMISSION SET
      this.newProvider.facility = this.facilities;
      this.newProvider.policy = this.policies;
      this.newProvider.openDays = this.days;

      // PROVIDER VALUES ENTITY SET < Form Submission^^
      // this.addProviderInfo('name', this.newProvider.name);
      // this.addProviderInfo('locationName', this.newProvider.location);
      this.addProviderInfo('address', this.newProvider.address);
      this.addProviderInfo('callNumber', this.newProvider.phone);
      // this.addProviderInfo('luxuryCategory',Number(this.newProvider.luxuryCategory));
      this.addProviderInfo('taxRate', this.newProvider.taxRate);
      this.addProviderInfo('serviceCharge', this.newProvider.serviceCharge);
      this.addProviderInfo('mapUrl', this.newProvider.mapUrl);
      // this.addProviderInfo('simpleDescription', this.newProvider.description);
      this.addProviderInfo('facility', this.newProvider.facility);
      this.addProviderInfo('policy', this.newProvider.policy);
      this.addProviderInfo('openDays', this.newProvider.openDays);
      this.addProviderInfo('logoImage', 'logoImage');
      this.addProviderInfo('coverImage', 'coverImage');
      this.addProviderInfo('bannerImage', 'bannerImage');
      this.addProviderDto.serviceUserId = Number(serviceUserId);
      this.addProviderDto.simpleDescription = this.newProvider.simpleDescription;
      this.addProviderDto.providerValues = this.providerValues;
      this.addProviderDto.categoryId = Number(this.newProvider.category);
      this.addProviderDto.providerTypeId = Number(
        this.newProvider.providerType
      );

      this.addProviderDto.providerName = this.newProvider.name;
      this.addProviderDto.luxuryCategory = this.newProvider.luxuryCategory;
      this.addProviderDto.location = this.newProvider.location;
      this.providerInfo.logoImage = this.newProvider.logoImage;
      this.providerInfo.coverImage = this.newProvider.coverImage;
      this.providerInfo.bannerImage = this.newProvider.bannerImage;
      this.providerInfo.providerInfo = this.addProviderDto;
      this.addProviderDto.businessRegNo = this.newProvider.businessRegNo;
      this.addProviderDto.nicNo = this.newProvider.nicNo;

      console.log(this.newProvider);
      console.log(this.providerInfo);
      // this.providerService.addProvider(this.providerInfo).subscribe((res) => {
      //   this.resetForm();
      //   this.router.navigateByUrl('/provider');
      // });
    }
  }

  addProviderInfo(type, name) {
    if (name != '') {
      this.providerValues.push({
        propertyIdentifier: type,
        providerValueStr: name,
      });
    }
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
    this.providerValues = [];
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
    this.providerValues = [];
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

  onProviderTypeSelect(value) {
    this.categoryService.getCategoryByType(value).subscribe((res) => {
      let categoryData = res.data;
      this.categoryList = categoryData;
      console.log(categoryData);
      console.log(this.categoryList);
    });
  }

  onGetAllDistricts() {
    this.providerService.getAllDistricts().subscribe((res) => {
      console.log(res);
      this.districtList = res.data;
    });
  }

  // onDistrictSelect(value) {
  //   this.providerService.getLocationByDistrictId(value).subscribe((res) => {
  //     console.log(res);
  //     this.locationList = res.data;
  //   });
  // }

  onGetProviderById(value) {
    this.providerService.getProviderViewById(value).subscribe((res) => {
      console.log(res.data);
      this.providerDetails = res.data;

      this.luxuryCategorySelected = String(this.providerDetails.luxuryCategory);
      this.ProviderTypeSelected = String(this.providerDetails.providerTypeName);
      this.categorySelected = String(this.providerDetails.categoryName);

      this.dayList = res.data.openDays;

      this.imgURLLogo = res.data.logoImage;
      this.imgURLCover = res.data.coverImage;
      this.imgURLBanner = res.data.bannerImage;

      console.log(this.imgURLLogo);

      this.newProvider.logoImage = res.data.logoImage;
      this.newProvider.bannerImage = res.data.bannerImage;
      this.newProvider.coverImage = res.data.coverImage;

      // this.onDistrictSelect(res.data.districtId);
    });
  }

  onSubmit2(){

    if(this.addProviderForm.value.name == null){

      this.newProvider.name = this.providerDetails.providerName;

    }else if(this.addProviderForm.value.name !== null){

      this.newProvider.name = this.addProviderForm.value;utf8Encode.name;

    }

    if(this.addProviderForm.value.providerType == null){

      if(this.providerDetails.providerTypeName == 'Restaurant'){

        let getProviderTypeId = '1';
        this.newProvider.providerType = getProviderTypeId;

      }else if(this.providerDetails.providerTypeName == 'Hotel'){
        let getProviderTypeId = '2';
        this.newProvider.providerType = getProviderTypeId;
      }

    }else if(this.addProviderForm.value.providerType !== null){

      this.newProvider.providerType = this.addProviderForm.value.providerType;

    }

    if(this.addProviderForm.value.location == null){

      this.newProvider.location = this.providerDetails.locationName;

    }else if(this.addProviderForm.value.location !== null){

      this.newProvider.location = this.addProviderForm.value.location;

    }

    if(this.addProviderForm.value.address == null){

      this.newProvider.address = this.providerDetails.address;

    }else if(this.addProviderForm.value.address!== null){

      this.newProvider.address = this.addProviderForm.value.address;

    }

    if(this.addProviderForm.value.phone == null){

      this.newProvider.phone = this.providerDetails.callNumber;

    }else if(this.addProviderForm.value.phone !== null){

      this.newProvider.phone = this.addProviderForm.value.phone;

    }

    if(this.addProviderForm.value.categoryType == null){

      this.newProvider.category = this.providerDetails.categoryId;

    }else if(this.addProviderForm.value.categoryType !== null){

      this.newProvider.category = this.addProviderForm.value.categoryType;

    }

    if(this.addProviderForm.value.luxuryType == null){

      this.newProvider.luxuryCategory = this.providerDetails.luxuryCategory;

    }else if(this.addProviderForm.value.luxuryType !== null){

      this.newProvider.luxuryCategory = this.addProviderForm.value.luxuryType;

    }

    if(this.addProviderForm.value.taxRate == null){

      this.newProvider.taxRate = this.providerDetails.taxRate;

    }else if(this.addProviderForm.value.taxRate !== null){

      this.newProvider.taxRate = this.addProviderForm.value.taxRate;

    }

    if(this.addProviderForm.value.serviceCharge == null){

      this.newProvider.serviceCharge = this.providerDetails.serviceCharge;

    }else if(this.addProviderForm.value.serviceCharge !== null){

      this.newProvider.serviceCharge = this.addProviderForm.value.serviceCharge;

    }

    if(this.addProviderForm.value.mapUrl == null){

      this.newProvider.mapUrl = this.providerDetails.mapUrl;

    }else if(this.addProviderForm.value.mapUrl !== null){

      this.newProvider.mapUrl = this.addProviderForm.value.mapUrl;

    }

    if(this.addProviderForm.value.description == null){

      this.newProvider.simpleDescription = this.providerDetails.simpleDescription;

    }else if(this.addProviderForm.value.description !== null){

      this.newProvider.simpleDescription = this.addProviderForm.value.description;

    }

    if(this.newProvider.logoImage == null){
      this.newProvider.logoImage = this.imgURLLogo;
    }

    if (this.facilityArray.length != 0) {
      this.facilities = this.facilityArray;
    }

    if (this.policyArray.length != 0) {
      this.policies = this.policyArray;
    }

    this.days = this.dayList;


    this.newProvider.facility = this.facilities;
    this.newProvider.policy = this.policies;
    this.newProvider.openDays = this.days;

    let serviceUserId = localStorage.getItem('serviceUserId');


    this.addProviderInfo('address', this.newProvider.address);
    this.addProviderInfo('callNumber', this.newProvider.phone);
    // this.addProviderInfo('luxuryCategory',Number(this.newProvider.luxuryCategory));
    this.addProviderInfo('taxRate', this.newProvider.taxRate);
    this.addProviderInfo('serviceCharge', this.newProvider.serviceCharge);
    this.addProviderInfo('mapUrl', this.newProvider.mapUrl);
    // this.addProviderInfo('simpleDescription', this.newProvider.description);
    this.addProviderInfo('facility', this.newProvider.facility);
    this.addProviderInfo('policy', this.newProvider.policy);
    this.addProviderInfo('openDays', this.newProvider.openDays);
    this.addProviderInfo('logoImage', this.providerDetails.logoImage);
    this.addProviderInfo('coverImage', this.providerDetails.coverImage);
    this.addProviderInfo('bannerImage', this.providerDetails.bannerImage);
    this.addProviderDto.serviceUserId = Number(serviceUserId);
    this.addProviderDto.simpleDescription = this.newProvider.simpleDescription;
    this.addProviderDto.providerValues = this.providerValues;
    this.addProviderDto.categoryId = Number(this.newProvider.category);
    this.addProviderDto.providerTypeId = Number(
      this.newProvider.providerType
    );

    this.addProviderDto.providerId = Number(localStorage.getItem('viewProviderId'));

    this.addProviderDto.providerName = this.newProvider.name;
    this.addProviderDto.luxuryCategory = this.newProvider.luxuryCategory;
    this.addProviderDto.location = this.newProvider.location;

    
    this.providerInfo.logoImage = this.newProvider.logoImage;
    this.providerInfo.coverImage = this.newProvider.coverImage;
    this.providerInfo.bannerImage = this.newProvider.bannerImage;

    
    this.providerInfo.providerInfo = this.addProviderDto;
    // this.addProviderDto.businessRegNo = this.newProvider.businessRegNo;
    // this.addProviderDto.nicNo = this.newProvider.nicNo;

    // if(this.addProviderForm.value.BRNumber == null){

    //   this.newProvider.businessRegNo = this.providerDetails.businessRegNo;

    // }else if(this.addProviderForm.value.BRNumber !== null){

    //   this.newProvider.businessRegNo = this.addProviderForm.value.BRNumber;

    // }

    
    console.log(this.providerInfo);


    this.providerService.editProvider(this.providerInfo).subscribe((res) => {
      console.log(res);
      this.resetForm();
      this.router.navigateByUrl('/provider');
      
    });

    
  }

  onGetDefaultCategory(value) {
    this.categoryService.getCategoryByType(value).subscribe((res) => {
      let categoryData = res.data;
      this.categoryList = categoryData;
      // console.log(this.categoryList);
    });
  }

  setFacility() {
    this.facilityArray = [
      {
        title: 'Abc',
        description: 'aabbcc',
      },
      {
        title: 'DEF',
        description: 'DDEEFF',
      },
    ];
  }

  setPolicy() {
    this.policyArray = [
      {
        title: '123',
        description: 'cde789',
      },
      {
        title: '456',
        description: 'abc456',
      },
      {
        title: '789',
        description: 'dfghsty546',
      },
    ];
  }

  setDays() {
    this.baseDayList = [
      { day: 'Monday', isOpen: false, hours: '00:00-00:00' },
      { day: 'Tuesday', isOpen: false, hours: '00:00-00:00' },
      { day: 'Wednesday', isOpen: false, hours: '00:00-00:00' },
      { day: 'Thursday', isOpen: false, hours: '00:00-00:00' },
      { day: 'Friday', isOpen: false, hours: '00:00-00:00' },
      { day: 'Saturday', isOpen: false, hours: '00:00-00:00' },
      { day: 'Sunday', isOpen: false, hours: '00:00-00:00' },
    ];
  }
}
