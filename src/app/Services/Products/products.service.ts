import { Products } from './../../Interfaces/Products/products';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseURL } from '../../Base/Environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private _HTTPClient:HttpClient) { }

  getProducts():Observable<null|Products> {
    return this._HTTPClient.get<null|Products>(`${BaseURL.baseURL}/api/v1/products`);
  }
}
