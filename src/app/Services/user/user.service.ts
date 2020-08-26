import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from 'src/app/entity/globals';
import { AddUserDto } from 'src/app/Entity/addUserDto';

const httpOptions = {
  headers : new HttpHeaders({'Authorization':`${localStorage.getItem('token')}`})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = this.globals.baseUrl;

  constructor(private http: HttpClient, private globals: Globals) { }

  getServiceUserType(value):Observable<any>{
    let signingUrl = this.baseUrl +'/userSetting/serviceUsertTypes/';
    return this.http.get<any>(signingUrl + value,httpOptions);
  }

}
