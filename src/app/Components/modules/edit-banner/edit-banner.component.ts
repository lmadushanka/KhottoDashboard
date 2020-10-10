import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/Services/session/session.service';
import { AddBannerDto } from 'src/app/Entity/addBannerDto';
import { BannerDto } from 'src/app/Entity/bannerDto';
import { BannerService } from 'src/app/Services/banner/banner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-banner',
  templateUrl: './edit-banner.component.html',
  styleUrls: ['./edit-banner.component.scss']
})
export class EditBannerComponent implements OnInit {

  addBannerDto: AddBannerDto = new AddBannerDto();
  bannerDto: BannerDto = new BannerDto();

  //For Images
  public imagePathCover;
  imgURLCover: any;
  bannerIf: boolean = false;

  addBannerForm = new FormGroup({
    bannerName: new FormControl(),
    description: new FormControl(),
    banner: new FormControl(),
    visible: new FormControl(),
  });

  bannerFile: File = null;

  visibilitySelected = '';

  bannerDetails:any = {
    bannerDescription: '',
    bannerId: '',
    bannerImage: '',
    bannerName: '',
  };

  constructor(
    private session: SessionService,
    private BannerService: BannerService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.BannerService.getBannerByBannerId(localStorage.getItem('bannerId')).subscribe((res) =>{
      console.log(res);
      this.bannerDetails = res.data;
      this.imgURLCover = res.data.bannerImage

      this.visibilitySelected = String(res.data.visible);
    });

  }

  onSubmit(){

    this.bannerDto.bannerName = this.addBannerForm.value.bannerName;
    this.bannerDto.bannerDescription = this.addBannerForm.value.description;

    this.bannerDto.bannerImage = this.bannerFile;
    this.bannerDto.visible = Number(this.addBannerForm.value.visible);
    this.bannerDto.serviceUserId = Number(localStorage.getItem('serviceUserId'));

    this.addBannerDto.bannerImage = this.bannerDto.bannerImage;
    this.addBannerDto.bannerInfo = this.bannerDto;

    if(this.bannerDto.bannerName == null){
      this.bannerDto.bannerName = this.bannerDetails.bannerName;
    }

    if(this.bannerDto.bannerDescription == null){
      this.bannerDto.bannerDescription = this.bannerDetails.bannerDescription;
    }

    if(this.bannerDto.bannerImage == null){
      this.bannerDto.bannerImage = this.bannerDetails.bannerImage;
      this.addBannerDto.bannerImage = this.bannerDto.bannerImage;
    }

    if(this.addBannerForm.value.visible == null){
      this.bannerDto.visible = this.bannerDetails.visible;
    }


    console.log(this.addBannerDto);

    this.BannerService.updateBannerByBannerId(localStorage.getItem('bannerId'), this.addBannerDto).subscribe((res) =>{
      console.log(res);
      this.router.navigateByUrl('/banner');
    })

  }

  onClear(){
    this.addBannerForm.reset();
  }

  onCoverSelected(event) {
    if (event.target.files.length === 0) return;

    var reader = new FileReader();
    this.imagePathCover = event.target.files;
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgURLCover = reader.result;
    };

    this.bannerIf = false;

    var file: File = <File>event.target.files[0];
    this.bannerFile = file;
    this.bannerDto.bannerImage = this.bannerFile;
  }

}
