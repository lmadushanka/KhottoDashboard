import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { SessionService } from 'src/app/services/session/session.service';
import { ProviderService } from 'src/app/services/provider/provider.service';

export interface PeriodicElement {
  provider: string;
  type: string;
  address: String;
  action: string;
}

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.scss'],
})
export class ProviderComponent implements OnInit {
  ELEMENT_DATA: PeriodicElement[] = [];

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
    this.session.sessionCheck();
    this.getAllProvider();
  }

  displayedColumns: string[] = ['provider', 'name', 'address', 'action'];
  dataSource = this.ELEMENT_DATA;

  // getProviderList(providerTypeId: number) {
   
  //   this.dataSource = this.ELEMENT_DATA;

  //   this.providerService.getProviderList(providerTypeId).subscribe((res) => {
  //     console.log(res);
  //     this.dataSource = res;
  //     console.log(this.dataSource);
  //   });
  // }

    getAllProvider() {

      this.providerService.getAllProviderList().subscribe((res) => {
        console.log(res);
        this.ELEMENT_DATA = res.data;
        this.dataSource = this.ELEMENT_DATA;

        console.log(this.dataSource);

        
      });
    }
}
