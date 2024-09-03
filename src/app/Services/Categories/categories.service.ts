import { Categories } from './../../Interfaces/Categories/categories';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from '../../Base/Environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private _HTTPClient:HttpClient) { }

  getCategories(page?:string):Observable<null|Categories> {
    let url:string = (page) ? `${BaseURL.baseURL}/api/v1/categories?page=${page}` : `${BaseURL.baseURL}/api/v1/categories`;
    return this._HTTPClient.get<null|Categories>(url);
  }

  getSubcategoriesOnCategory(productId:string):Observable<Categories> {
    return this._HTTPClient.get<Categories>(`${BaseURL.baseURL}/api/v1/categories/${productId}/subcategories`);
  }
}
