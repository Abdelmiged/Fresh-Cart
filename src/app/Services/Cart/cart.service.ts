import { Injectable } from '@angular/core';
import { Cart } from '../../Interfaces/Cart/cart';
import { HttpClient } from '@angular/common/http';
import { BaseURL } from '../../Base/Environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItemsCount:BehaviorSubject<number> = new BehaviorSubject<number>(0)
  constructor(private _HTTPClient:HttpClient, private _ToastrService:ToastrService) { }

  addProductToCart(productId:string):Observable<null|Cart> {
    return this._HTTPClient.post<null|Cart>(`${BaseURL.baseURL}/api/v1/cart`, {productId:productId})
  }

  getUserCart():Observable<null|Cart> {
    return this._HTTPClient.get<null|Cart>(`${BaseURL.baseURL}/api/v1/cart`)
  }

  removeItem(productId:string):Observable<null|Cart> {
    return this._HTTPClient.delete<null|Cart>(`${BaseURL.baseURL}/api/v1/cart/${productId}`)
  }

  updateProductQuantity(productId:string, count:number):Observable<null|Cart> {
    return this._HTTPClient.put<null|Cart>(`${BaseURL.baseURL}/api/v1/cart/${productId}`, {count:count})
  }

  clearCart():Observable<null|{message:string}> {
    return this._HTTPClient.delete<null|{message:string}>(`${BaseURL.baseURL}/api/v1/cart`)
  }

  frontAddProductToCart(productId:string):void {
    this.addProductToCart(productId).subscribe(res => {
      this.cartItemsCount.next(this.cartItemsCount.getValue() + 1);
      this._ToastrService.success('Product Successfully Added to Cart', 'Added To Cart!', {
        progressBar: true,
        timeOut: 3000
      });
    });
  }
}
