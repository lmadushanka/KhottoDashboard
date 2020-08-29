import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from 'src/app/entity/globals';
import { AddBannerDto } from 'src/app/Entity/addBannerDto';

const httpOptions = {
  headers : new HttpHeaders({'Authorization':`${localStorage.getItem('token')}`})
};

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  private baseUrl = this.globals.baseUrl;

  constructor(private http: HttpClient, private globals: Globals) { }

  getAllBannerList(){
    let signinUrl = this.baseUrl + '/banner';

    return this.http.get<any>(signinUrl, httpOptions);
  }

  addNewBanner(addBannerDto:AddBannerDto):Observable<any>{
    let signinUrl = this.baseUrl + '/banner';

    var addBannerForm = new FormData();

    var bannerDto = JSON.stringify(addBannerDto.bannerInfo);

    addBannerForm.append('bannerImage', addBannerDto.bannerImage);

    addBannerForm.append('bannerInfo', bannerDto);

    return this.http.post<any>(signinUrl, addBannerForm, httpOptions);
  }
}
