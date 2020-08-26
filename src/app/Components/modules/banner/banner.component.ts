import { Component, OnInit } from '@angular/core';
import { BannerService } from 'src/app/Services/banner/banner.service';

export interface PeriodicElement {
  bannerName: string;
  description: string;
  image: any;
  view: string;
  edit: string;
  cancel: string;
  visible: boolean;
}

const ELEMENT_DATA: PeriodicElement[] = [];

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],
})
export class BannerComponent implements OnInit {
  ELEMENT_DATA: PeriodicElement[] = [];
  deleteElement: any = { name: '', itemTypeId: 0 };
  // truthyValue: boolean = true;

  constructor(private bannerService: BannerService) {}

  ngOnInit(): void {
    this.getAllBanner();
  }

  displayedColumns: string[] = [
    'bannerName',
    'description',
    'bannerImage',
    'view',
    'edit',
    'cancel',
  ];
  dataSource = ELEMENT_DATA;

  getAllBanner() {
    this.bannerService.getAllBannerList().subscribe((res) => {
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      console.log(this.dataSource);
    });
  }

  setDeleteItem(element) {
    this.deleteElement.name = element.name;
    this.deleteElement.itemId = element.itemId;
  }

  // deleteItem() {
  //   console.log(this.deleteElement.itemId);
  //   this.ItemService.deleteItemById(this.deleteElement.itemId).subscribe((res) => {
  //     this.getAllItems(this.nextCount);
  //   });
  // }
}
