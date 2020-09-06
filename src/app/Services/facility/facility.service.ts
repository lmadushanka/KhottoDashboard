import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders ,HttpParams } from '@angular/common/http';
import { Globals } from 'src/app/entity/globals';

const httpOptions = {
  headers : new HttpHeaders({'Authorization':`${localStorage.getItem('token')}`}),
  // params : new HttpParams().set('providerTypeId',value)
};

@Injectable({
  providedIn: 'root'
})
export class FacilityService {

  private baseUrl = this.globals.baseUrl;

  constructor(private httpClient:HttpClient,private globals:Globals) { }

  getAllFacility(){
    let facilityUrl = this.baseUrl + '/facilityType/all/1';

    return this.httpClient.get<any>(facilityUrl,httpOptions);
  }

  addFacility(value){
    let facilityUrl = this.baseUrl + '/facilityType';

    return this.httpClient.post<any>(facilityUrl,value,httpOptions);
  }
}