import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SessionService } from 'src/app/Services/session/session.service';
import { AddBannerDto } from 'src/app/Entity/addBannerDto';
import { BannerDto } from 'src/app/Entity/bannerDto';
import { BannerService } from 'src/app/Services/banner/banner.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-banner',
  templateUrl: './view-banner.component.html',
  styleUrls: ['./view-banner.component.scss']
})
export class ViewBannerComponent implements OnInit {
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

  bannerDetails:any = {
    bannerDescription: '',
    bannerId: '',
    bannerImage: '',
    bannerName: '',
  };

  bannerVisibilty:any;

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

      if(res.data.visible == 0){
        this.bannerVisibilty = 'Hide';
      }else if(res.data.visible == 1){
        this.bannerVisibilty = 'Show';
      }
    });

  }

  onSubmit(){

  }

  onClear(){

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
