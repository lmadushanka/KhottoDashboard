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
export class ItemOptionService {

  private baseUrl = this.globals.baseUrl;

  constructor(private http: HttpClient, private globals: Globals) {}

  getItemOptionByItemType(value):Observable<any>{
    var itemOptionUrl = this.baseUrl + '/itemOption/';

    return this.http.get(itemOptionUrl + value , httpOptions);
  }

  addItemOption(value):Observable<any>{
    var itemOptionUrl = this.baseUrl + '/itemOption';

    return this.http.post(itemOptionUrl, value , httpOptions);
  }

  getItemOptionByItemId(value):Observable<any>{
    var itemOptionUrl = this.baseUrl + '/itemOption/all';

    return this.http.post(itemOptionUrl, value , httpOptions);
  }

  updateItemOptionByItemOptionId(value1,value2):Observable<any>{
    var itemOptionUrl = this.baseUrl + '/itemOption/';

    return this.http.put(itemOptionUrl + value1, value2 , httpOptions);
  }

  expireItemOption(value1,value2):Observable<any>{
    var itemOptionUrl = this.baseUrl + '/itemOption/expire/';

    return this.http.patch(itemOptionUrl + value1, value2 , httpOptions);
  }
}
