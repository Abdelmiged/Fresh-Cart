import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Brands } from '../../Interfaces/Brands/brands';
import { BaseURL } from '../../Base/Environment';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  constructor(private _HTTPClient:HttpClient) { }

  getAllBrands(page?:string):Observable<Brands> {
    let url:string = (page) ? `${BaseURL.baseURL}/api/v1/brands?page=${page}` : `${BaseURL.baseURL}/api/v1/brands`;
    return this._HTTPClient.get<Brands>(url);
  }
}
