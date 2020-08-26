import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders ,HttpParams } from '@angular/common/http';
import { Globals } from 'src/app/entity/globals';
import { AddCategoryDto } from 'src/app/entity/addCategoryDto';

const httpOptions = {
  headers : new HttpHeaders({'Authorization':`${localStorage.getItem('token')}`}),
  // params : new HttpParams().set('providerTypeId',value)
};

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  private baseUrl = this.globals.baseUrl;

  constructor(private httpClient:HttpClient,private globals:Globals) { }

  getCategoryByType(value):Observable<any>{
    let categoryUrl = this.baseUrl + '/category/all/';

    

    // const params = new HttpParams().set('providerTypeId',type);

    return this.httpClient.get<any>(categoryUrl+value,httpOptions);
  }

  getAllCategory():Observable<any>{
    let categoryUrl = this.baseUrl + '/category/all';

    

    // const params = new HttpParams().set('providerTypeId',type);

    return this.httpClient.get<any>(categoryUrl,httpOptions);
  }

  addCategory(addCategoryDto:AddCategoryDto): Observable<any> {
    let categoryUrl = this.baseUrl + '/category';

    var categoryForm = new FormData();
    var categoryDto = JSON.stringify(addCategoryDto.categoryInfo);

    categoryForm.append('categoryCardImage', addCategoryDto.categoryCardImage);

    categoryForm.append('categoryInfo', categoryDto);

    return this.httpClient.post(categoryUrl, categoryForm, httpOptions);
  }

}
