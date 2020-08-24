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
  ELEMENT_DATA: PeriodicElement[] = [
    { provider: 'Lakshitha', type: 'Hotel', address: 'nugegoda', action: 'H' },
  ];

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
  }

  displayedColumns: string[] = ['provider', 'type', 'address', 'action'];
  dataSource = this.ELEMENT_DATA;

  getProviderList(providerTypeId: number) {
    this.ELEMENT_DATA = [
      {
        provider: 'Lakshitha',
        type: 'Hotel',
        address: 'Nugegoda',
        action: 'H',
      },
      {
        provider: 'Chamika',
        type: 'Res',
        address: 'Gampaha',
        action: 'R',
      },
    ];

    this.dataSource = this.ELEMENT_DATA;

    this.providerService.getProviderList(providerTypeId).subscribe((res) => {
      console.log(res);
    });
  }
}
