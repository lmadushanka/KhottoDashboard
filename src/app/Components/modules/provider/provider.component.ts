import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/Services/session/session.service';
import { ProviderService } from 'src/app/Services/provider/provider.service';

export interface PeriodicElement {
  provider: string;
  type: string;
  address: String;
  view: string;
  edit: string;
  delete: string;
}

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss'],
})
export class ProviderComponent implements OnInit {
  
  ELEMENT_DATA: PeriodicElement[] = [];
  deleteElement: any = { name: '', providerId: 0 };

  nextCount:any;

  providerTypeList = [
    { name: 'Resturent', value: 1 },
    { name: 'Hotel', value: 2 },
  ];

  constructor(
    private router: Router,
    private session: SessionService,
    private providerService: ProviderService
  ) {}

  ngOnInit() {

    this.nextCount = 1;

    this.session.sessionCheck();
    this.getAllProvider(this.nextCount);
  }

  displayedColumns: string[] = [
    'provider',
    'name',
    'address',
    'view',
    'edit',
    'delete',
  ];
  dataSource = this.ELEMENT_DATA;

  viewProviderId: string;

  // getProviderList(providerTypeId: number) {

  //   this.dataSource = this.ELEMENT_DATA;

  //   this.providerService.getProviderList(providerTypeId).subscribe((res) => {
  //     console.log(res);
  //     this.dataSource = res;
  //     console.log(this.dataSource);
  //   });
  // }

  getAllProvider(value) {

    this.providerService.getAllProviderList(value).subscribe((res) => {
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      // console.log(this.dataSource);
    });
  }

  onNextButton() {
    let i = 0;

    i++;

    this.nextCount += i;
    // console.log(this.nextCount);

    this.providerService.getAllProviderList(this.nextCount).subscribe((res) => {
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      // console.log(this.dataSource);
    });
  }

  onPreviewButton() {
    let i = 0;

    i--;

    if (this.nextCount != 1) {
      this.nextCount += i;
      // console.log(this.nextCount);
    }

    this.providerService.getAllProviderList(this.nextCount).subscribe((res) => {
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;

      // console.log(this.dataSource);
    });
  }

  setDeleteProvider(element) {
    this.deleteElement.name = element.name;
    this.deleteElement.providerId = element.providerId;
  }

  deleteProvider() {
    console.log(this.deleteElement.providerId);
    this.providerService
      .deleteProviderById(this.deleteElement.providerId)
      .subscribe((res) => {
        console.log(res);
        this.getAllProvider(this.nextCount);
      });
  }

  setViewProvider(element) {
    localStorage.setItem('viewProviderId', element);
    this.viewProviderId = element.providerId;
    this.router.navigateByUrl('/view-provider');
  }

  setEditProvider(element){
    localStorage.setItem('viewProviderId', element);
    this.viewProviderId = element.providerId;
    this.router.navigateByUrl('/edit-provider');
  }
}
