import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from 'src/app/Entity/globals';
import { AddItemDto } from 'src/app/Entity/addItemDto';

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
    let signinUrl = this.baseUrl + '/item/searchItem';

    return this.http.post<any>(signinUrl, value, httpOptions);
  }

  getOptionsByItemType(value):Observable<any>{
    let signingUrl = this.baseUrl +'/itemOption/all/';
    return this.http.get<any>(signingUrl + value,httpOptions);
  }

  deleteItemById(value):Observable<any>{
    let signingUrl = this.baseUrl + '/item/';
    let serviceUserId = localStorage.getItem('serviceUserId');

    return this.http.delete<any>(signingUrl + value + '/' + serviceUserId, httpOptions);
  }

  getItemByItemId(value){
    let signingUrl = this.baseUrl +'/item/';
    return this.http.get<any>(signingUrl + value,httpOptions);
  }

  updateItemByItemId(addItemDto: AddItemDto):Observable<any>{
    let signingUrl = this.baseUrl +'/item';

    var itemForm = new FormData();
    var itemDto = JSON.stringify(addItemDto.itemInfo);

    itemForm.append('coverImage', addItemDto.coverImage);

    itemForm.append('itemInfo', itemDto);

    return this.http.put<any>(signingUrl, itemForm, httpOptions);
  }

}
