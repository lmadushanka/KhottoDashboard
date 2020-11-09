import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from 'src/app/Entity/globals';
import { AddBannerDto } from 'src/app/Entity/addBannerDto';
import { BannerDto } from 'src/app/Entity/bannerDto';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

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

  getBannerByBannerId(value):Observable<any>{
    let bannerUrl = this.baseUrl + '/banner/';

    return this.http.get<any>(bannerUrl + value, httpOptions);
  }

  updateBannerByBannerId(value,addBannerDto:AddBannerDto):Observable<any>{
    let bannerUrl = this.baseUrl + '/banner/';

    var updateBannerForm = new FormData();

    var bannerDto = JSON.stringify(addBannerDto.bannerInfo);

    updateBannerForm.append('bannerImage', addBannerDto.bannerImage);

    updateBannerForm.append('bannerInfo', bannerDto);

    return this.http.put<any>(bannerUrl + value, updateBannerForm, httpOptions);
  }

  onCancelBanner(value):Observable<any>{
    let bannerUrl = this.baseUrl + '/banner/cancel/';

    return this.http.patch<any>(bannerUrl + value, httpOptions);
  }
}
