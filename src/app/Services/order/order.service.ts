import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from 'src/app/entity/globals';
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
    console.log(value);
    let signinUrl = this.baseUrl +'/order/searchOrder';
    return this.http.post<any>(signinUrl,value, httpOptions);
  }

  getOrderById(value){
    let signinUrl = this.baseUrl +'/order/';
    return this.http.get<any>(signinUrl + value, httpOptions);
  }
}
