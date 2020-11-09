import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from 'src/app/Entity/globals';
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

  getAllUsers(value):Observable<any>{
    let signingUrl = this.baseUrl + '/user/searchByFilters';
    return this.http.post<any>(signingUrl,value,httpOptions);
  }

  addUser(value):Observable<any>{
    let signingUrl = this.baseUrl + '/auth/signup';
    return this.http.post<any>(signingUrl,value,httpOptions);
  }

  getUserByServiceUserId(value):Observable<any>{
    let userUrl = this.baseUrl + '/user/';
    return this.http.get<any>(userUrl + value,httpOptions);
  }

  updateUser(value1,value2):Observable<any>{
    let userUrl = this.baseUrl + '/user/';
    return this.http.put<any>(userUrl + value1, value2, httpOptions);
  }

}
