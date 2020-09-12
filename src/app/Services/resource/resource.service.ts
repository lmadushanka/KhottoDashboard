import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from 'src/app/entity/globals';

const httpOptions = {
  headers : new HttpHeaders({'Authorization':`${localStorage.getItem('token')}`}),
}

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  private baseUrl = this.globals.baseUrl;

  constructor(private httpClient:HttpClient,private globals:Globals) { }

  getResource():Observable<any>{
    let resourceUrl = this.baseUrl + '/resource/1';

    return this.httpClient.get<any>(resourceUrl,httpOptions);
  }

  getAllResourceName():Observable<any>{
    let resourceUrl = this.baseUrl + '/resource/all';

    return this.httpClient.get<any>(resourceUrl,httpOptions);
  }
}
