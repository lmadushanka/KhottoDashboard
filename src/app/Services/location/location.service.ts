import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from 'src/app/Entity/globals';
import { ReturnStatement } from '@angular/compiler';

const httpOptions = {
  headers : new HttpHeaders({'Authorization':`${localStorage.getItem('token')}`}),
}

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private baseUrl = this.globals.baseUrl;

  constructor(private httpClient:HttpClient,private globals:Globals) { }

  getAllLocation(value):Observable<any>{
    let locationUrl = this.baseUrl + '/location/all';

    return this.httpClient.post(locationUrl,value,httpOptions);
  }

  setNewLocation(value):Observable<any>{
    let locationUrl = this.baseUrl + '/location';

    return this.httpClient.post(locationUrl,value,httpOptions);
  }
}
