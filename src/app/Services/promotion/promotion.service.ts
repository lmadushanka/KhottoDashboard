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
export class PromotionService {

  private baseUrl = this.globals.baseUrl;

  constructor(private httpClient:HttpClient,private globals:Globals) { }

  addPromotion(value):Observable<any>{
    let promotionUrl = this.baseUrl + '/promotion';

    return this.httpClient.post<any>(promotionUrl,value,httpOptions);
  }

  getAllPromotion(value):Observable<any>{
    let promotionUrl = this.baseUrl + '/promotion/all';

    return this.httpClient.post<any>(promotionUrl,value,httpOptions);
  }

  expirePromoCode(value):Observable<any>{
    let promotionUrl = this.baseUrl + '/promotion/expire/';

    return this.httpClient.patch<any>(promotionUrl + value,httpOptions);
  }
}
