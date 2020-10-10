import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from 'src/app/Entity/globals';

const httpOptions = {
  headers : new HttpHeaders({'Authorization':`${localStorage.getItem('token')}`}),
}

@Injectable({
  providedIn: 'root'
})
export class SmsService {

  private baseUrl = this.globals.baseUrl;

  constructor(private httpClient:HttpClient,private globals:Globals) { }

  getFilterUser(value):Observable<any>{
    let filterUserUrl = this.baseUrl + '/clientUser/searchByFilters';
    return this.httpClient.post(filterUserUrl,value,httpOptions);
  }

  addSMS(value):Observable<any>{
    let addSMSUrl = this.baseUrl + '/sms/bulk';
    return this.httpClient.post(addSMSUrl,value,httpOptions);
  }

  getSMSReport(value):Observable<any>{
    let smsUrl = this.baseUrl + '/sms/all';
    return this.httpClient.post(smsUrl,value,httpOptions);
  }
}
