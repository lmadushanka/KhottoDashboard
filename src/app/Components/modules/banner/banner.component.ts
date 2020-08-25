import { Component, OnInit } from '@angular/core';
import { BannerService } from 'src/app/Services/banner/banner.service';

export interface PeriodicElement {
  bannerName: string;
  description: string;
  image: any;
}

const ELEMENT_DATA: PeriodicElement[] = [];


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  ELEMENT_DATA: PeriodicElement[] = [];

  constructor(private bannerService: BannerService) { }

  ngOnInit(): void {

    this.getAllBanner();
  }

  displayedColumns: string[] = ['bannerName', 'description', 'bannerImage'];
  dataSource = ELEMENT_DATA;

  getAllBanner(){
    this.bannerService.getAllBannerList().subscribe((res) => {
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      console.log(this.dataSource);

      
    });
  }

}
