import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/services/session/session.service';
import { ErrorService } from 'src/app/services/error/error.service';

export interface ErrorsElement {
  logId: number;
  origin: string;
  info: String;
  logHitAt: string;
}

@Component({
  selector: 'app-errors',
  templateUrl: './errors.component.html',
  styleUrls: ['./errors.component.scss'],
})
export class ErrorsComponent implements OnInit {
  ELEMENT_DATA: ErrorsElement[] = [];

  apiTypeList = [
    { name: 'Web API', value: 'w' },
    { name: 'Mobile API', value: 'm' },
  ];

  constructor(
    private session: SessionService,
    private errorService: ErrorService
  ) {}

  ngOnInit() {
    this.session.sessionCheck();
  }

  displayedColumns: string[] = ['logId', 'origin', 'info', 'logHitAt'];
  dataSource = this.ELEMENT_DATA;

  getErrors(type: string) {
    this.errorService.getErrorsByApi(type).subscribe((res) => {
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    });
  }
}
