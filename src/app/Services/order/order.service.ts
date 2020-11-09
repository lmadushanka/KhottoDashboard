import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from 'src/app/Entity/globals';
import { FilterOrderDto } from 'src/app/Entity/filterOrderDto';

const httpOptions = {
  headers : new HttpHeaders({'Authorization':`${localStorage.getItem('token')}`})
};

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = this.globals.baseUrl;

  filterOrderDto: FilterOrderDto;
  constructor(private http: HttpClient, private globals: Globals) { }
  

  getAllOrder(value){
    // console.log(value);
    let signinUrl = this.baseUrl +'/order/searchOrder';
    return this.http.post<any>(signinUrl,value, httpOptions);
  }

  getOrderById(value){
    let signinUrl = this.baseUrl +'/order/';
    return this.http.get<any>(signinUrl + value, httpOptions);
  }

  setRejectOrder(value1 , value2){
    let signinUrl = this.baseUrl +'/order/reject/';
    return this.http.patch<any>(signinUrl + value1,value2, httpOptions);
  }

  setConfirmOrder(value1 , value2){
    let signinUrl = this.baseUrl +'/order/confirm/';
    return this.http.patch<any>(signinUrl + value1,value2, httpOptions);
  }

  setAcceptOrder(value1 , value2){
    let signinUrl = this.baseUrl +'/order/accept/';
    return this.http.patch<any>(signinUrl + value1,value2, httpOptions);
  }

  setTrancaction(value){
    let signinUrl = this.baseUrl +'/transaction/acceptCash';
    return this.http.post<any>(signinUrl,value, httpOptions);
  }

}
