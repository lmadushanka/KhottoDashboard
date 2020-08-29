import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from 'src/app/entity/globals';

const httpOptions = {
  headers : new HttpHeaders({'Authorization':`${localStorage.getItem('token')}`})
};

@Injectable({
  providedIn: 'root'
})
export class DiscountService {
  private baseUrl = this.globals.baseUrl;

  constructor(private http: HttpClient, private globals: Globals) { }

  getAllDiscount(): Observable<any>{
    let signinUrl = this.baseUrl + '/discount/all';
    return this.http.get<any>(signinUrl, httpOptions);
  }

  getItemByProviderId(value){
    let signinUrl = this.baseUrl + '/item/itemNameList';
    return this.http.get<any>(signinUrl+ '/' + value, httpOptions);
  }

  addDiscount(value){
    let signinUrl = this.baseUrl + '/discount';
    return this.http.post<any>(signinUrl,value, httpOptions);
  }
}
