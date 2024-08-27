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

  getCategories():Observable<null|Categories> {
    return this._HTTPClient.get<null|Categories>(`${BaseURL.baseURL}/api/v1/categories`);
  }
}
