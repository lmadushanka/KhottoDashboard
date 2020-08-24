import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Globals } from 'src/app/entity/globals';
import { AddProviderDto } from 'src/app/entity/addProviderDto';
import { ProviderInfo } from 'src/app/entity/providerInfo';
import { FileObject } from 'src/app/entity/fileObject';

const httpOptions = {
  headers: new HttpHeaders({ 'Authorization': `${localStorage.getItem('token')}` })
};

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  private baseUrl = this.globals.baseUrl;

  constructor(private http: HttpClient, private globals: Globals) { }

  addProvider(addprovider: ProviderInfo): Observable<any> {
    var providerForm = new FormData();
    var providerInfoStr = JSON.stringify(addprovider.providerInfo);

    providerForm.append(
      'logoImage',
      addprovider.logoImage,
      //addprovider.logoImage.name
    );
    providerForm.append(
      'coverImage',
      addprovider.coverImage,
      // addprovider.coverImage.name
    );
    providerForm.append(
      'bannerImage',
      addprovider.bannerImage,
    );
    providerForm.append('providerInfo', providerInfoStr);

    let signinUrl = this.baseUrl + '/provider';
    return this.http.post(signinUrl, providerForm, httpOptions);
  }

  getProviderList(providerTypeId): Observable<any> {
    
    let signinUrl = this.baseUrl + '/provider/';
    let providerId = localStorage.getItem('providerId');

    return this.http.get<any>(signinUrl+providerTypeId+'/'+providerId, httpOptions);
  }

  getAllProviderList():Observable<any>{
    let signinUrl = this.baseUrl + '/provider/all/1';

    return this.http.get<any>(signinUrl, httpOptions);
  }
}
