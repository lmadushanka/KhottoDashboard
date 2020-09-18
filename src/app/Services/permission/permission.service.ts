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
export class PermissionService {

  private baseUrl = this.globals.baseUrl;

  constructor(private httpClient:HttpClient,private globals:Globals) { }

  getAllPermission(value):Observable<any>{
    let permissionUrl = this.baseUrl + '/permission/all';

    return this.httpClient.post<any>(permissionUrl,value,httpOptions);
  }
  
  addNewPermission(value):Observable<any>{
    let permissionUrl = this.baseUrl + '/permission';

    return this.httpClient.post<any>(permissionUrl,value,httpOptions);
  
  }
}
