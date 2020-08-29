import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/services/session/session.service';
import { AddBannerDto } from 'src/app/Entity/addBannerDto';
import { BannerDto } from 'src/app/Entity/bannerDto';
import { BannerService } from 'src/app/Services/banner/banner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-banner',
  templateUrl: './add-banner.component.html',
  styleUrls: ['./add-banner.component.scss']
})
export class AddBannerComponent implements OnInit {

  addBannerDto: AddBannerDto = new AddBannerDto();
  bannerDto: BannerDto = new BannerDto();

  //For Images
  public imagePathCover;
  imgURLCover: any;

  addBannerForm = new FormGroup({
    bannerName: new FormControl(),
    description: new FormControl(),
    banner: new FormControl(),
    visible: new FormControl(),
  });

  bannerFile: File = null;

  visibleList = [
    { name: 'Show', value: 1 },
    { name: 'Hide', value: 2 },
  ];

  constructor(
    private session: SessionService,
    private BannerService: BannerService,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }


  onSubmit() {
    var _this = this;

    this.bannerDto.bannerName = this.addBannerForm.value.bannerName;
    this.bannerDto.bannerDescription = this.addBannerForm.value.description;
    this.bannerDto.bannerImage = this.bannerFile;
    this.bannerDto.visible = Number(this.addBannerForm.value.visible);
    this.bannerDto.serviceUserId = Number(localStorage.getItem('serviceUserId'));

    this.addBannerDto.bannerImage = this.bannerDto.bannerImage;
    this.addBannerDto.bannerInfo = this.bannerDto;

    console.log(this.addBannerDto);

    this.BannerService.addNewBanner(this.addBannerDto).subscribe((res) => {
      console.log(res);
      this.resetForm();
      this.router.navigateByUrl('/banner');
    })

    

    
  }


  onCoverSelected(event){
    if (event.target.files.length === 0) return;

    var reader = new FileReader();
    this.imagePathCover = event.target.files;
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgURLCover = reader.result;
    };

    var file: File = <File>event.target.files[0];
    this.bannerFile = file;
    this.bannerDto.bannerImage = this.bannerFile;
  }

  resetForm() {
    this.addBannerForm.reset();
    this.bannerFile = null;
    this.imgURLCover = null;
  }

  onClear(){
    this.addBannerForm.reset();
    this.bannerFile = null;
    this.imgURLCover = null;
  }

}
