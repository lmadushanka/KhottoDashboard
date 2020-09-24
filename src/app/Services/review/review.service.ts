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
export class ReviewService {

  private baseUrl = this.globals.baseUrl;

  constructor(private httpClient:HttpClient,private globals:Globals) { }

  getFilterReview(value):Observable<any>{
    let reviewUrl = this.baseUrl + '/review/all';

    return this.httpClient.post(reviewUrl,value,httpOptions);
  }

  setSapmReview(value1 , value2):Observable<any>{
    let reviewUrl = this.baseUrl + '/review/markAsSpam/';

    return this.httpClient.patch(reviewUrl + value1 ,value2,httpOptions);
  }
}
