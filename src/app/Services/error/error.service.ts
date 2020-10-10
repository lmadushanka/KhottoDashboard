import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Globals } from 'src/app/Entity/globals';
import { Observable } from 'rxjs/internal/Observable';

const httpOptions = {
  headers : new HttpHeaders({'Authorization':`${localStorage.getItem('token')}`}),
  // params : new HttpParams().set('providerTypeId',value)
};

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  private baseUrl = this.globals.baseUrl;

  constructor(private httpClient:HttpClient,private globals:Globals) { }

  getErrorsByApi(apiType:string):Observable<any>{
    
    let errorUrl = this.baseUrl + '/logger/recent/';

    return this.httpClient.get<any>(errorUrl+apiType,httpOptions);
  }

  getAllError():Observable<any>{
    let errorUrl = this.baseUrl + '/logger/recent/';

    return this.httpClient.get<any>(errorUrl,httpOptions);
  }

  onClearErrorLog(value):Observable<any>{
    let errorUrl = this.baseUrl + '/logger/recent/';

    return this.httpClient.delete<any>(errorUrl+ value,httpOptions);
  }
  
}
