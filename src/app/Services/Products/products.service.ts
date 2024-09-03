import { Product, Products } from './../../Interfaces/Products/products';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from '../../Base/Environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HTTPClient:HttpClient) { }

  getProducts(page?:string):Observable<null|Products> {
    let url:string = (page) ? `${BaseURL.baseURL}/api/v1/products?page=${page}` : `${BaseURL.baseURL}/api/v1/products`;
    return this._HTTPClient.get<null|Products>(url);
  }

  getSpecificProduct(productId:string):Observable<null|{data:Product}> {
    return this._HTTPClient.get<null|{data:Product}>(`${BaseURL.baseURL}/api/v1/products/${productId}`);
  }
}
