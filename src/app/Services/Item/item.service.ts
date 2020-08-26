import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from 'src/app/entity/globals';
import { AddItemDto } from 'src/app/entity/addItemDto';

const httpOptions = {
  headers : new HttpHeaders({'Authorization':`${localStorage.getItem('token')}`})
};

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  private baseUrl = this.globals.baseUrl;

  constructor(private http: HttpClient, private globals: Globals) {}

  addItem(addItemDto: AddItemDto): Observable<any> {
    let addItemUrl = this.baseUrl + '/item';

    var itemForm = new FormData();
    var itemDto = JSON.stringify(addItemDto.itemInfo);

    itemForm.append('coverImage', addItemDto.coverImage);

    itemForm.append('itemInfo', itemDto);

    return this.http.post(addItemUrl, itemForm, httpOptions);
  }

  getProviders(): Observable<any>{
    let signinUrl = this.baseUrl + '/provider/providerNameList';
    return this.http.get<any>(signinUrl, httpOptions);
  }

  getAllItemList(value):Observable<any>{
    let signinUrl = this.baseUrl + '/item/all/';

    return this.http.get<any>(signinUrl + value, httpOptions);
  }

  getOptionsByItemType(value):Observable<any>{
    let signingUrl = this.baseUrl +'/itemOption/';
    return this.http.get<any>(signingUrl + value,httpOptions);
  }

  deleteItemById(value):Observable<any>{
    let signingUrl = this.baseUrl + '/item/';
    let serviceUserId = localStorage.getItem('serviceUserId');

    return this.http.delete<any>(signingUrl + value + '/' + serviceUserId, httpOptions);
  }

}
