import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from 'src/app/Entity/globals';


const httpOptions = {
  headers : new HttpHeaders({'Authorization':`${localStorage.getItem('token')}`})
};


@Injectable({
  providedIn: 'root'
})
export class KhottoDashboardService {

  private baseUrl = this.globals.baseUrl;

  constructor(private http: HttpClient, private globals: Globals) { }


  getSalesReport(){
    // console.log(value);
    let salesReportUrl = this.baseUrl +'/analytics/khotto/salesReport';
    return this.http.get<any>(salesReportUrl, httpOptions);
  }

  getProviderGrowth(){
    let salesReportUrl = this.baseUrl +'/analytics/khotto/providerGrowth';
    return this.http.get<any>(salesReportUrl, httpOptions);
  }

}
