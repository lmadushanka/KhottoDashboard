import { Component, OnInit } from '@angular/core';
import { SessionService } from 'src/app/Services/session/session.service';
import { ErrorService } from 'src/app/Services/error/error.service';
import { Route, Router } from '@angular/router';

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



  errorType:any = null;

  apiTypeList = [
    { name: 'Web API', value: 'w' },
    { name: 'Mobile API', value: 'm' },
  ];

  constructor(
    private session: SessionService,
    private errorService: ErrorService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.session.sessionCheck();
    this.getAll();
  }

  displayedColumns: string[] = ['logId','api', 'origin', 'info', 'logHitAt'];
  dataSource = this.ELEMENT_DATA;

  getErrors(type: string) {

    this.errorType = type;

    this.errorService.getErrorsByApi(type).subscribe((res) => {
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
    });
  }

  getAll(){
    this.errorService.getAllError().subscribe((res) => {
      console.log(res);
      this.ELEMENT_DATA = res.data;
      this.dataSource = this.ELEMENT_DATA;
      console.log(this.dataSource);
    });
  }

  onRefresh(){
    if(this.errorType !== null){
      this.errorService.getErrorsByApi(this.errorType).subscribe((res) => {
        console.log(res);
        this.ELEMENT_DATA = res.data;
        this.dataSource = this.ELEMENT_DATA;
      });
    }else{
      this.getAll();
    }
  }

  onClear(){

    this.errorService.onClearErrorLog(this.errorType).subscribe((res)=>{
      console.log(res);
      this.getAll();
    });

  }
}
