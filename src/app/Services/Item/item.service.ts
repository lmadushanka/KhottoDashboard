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
}
