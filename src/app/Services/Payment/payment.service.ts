import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ShippingAddress } from '../../Interfaces/UserData/user-data';
import { CreditOrder, FailedOrder, Order } from '../../Interfaces/Order/order';
import { BaseURL } from '../../Base/Environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _HTTPClient:HttpClient) { }

  createCashOrder(cartId:string, shippingAddress:ShippingAddress):Observable<Order|FailedOrder> {
    return this._HTTPClient.post<Order|FailedOrder>(`${BaseURL.baseURL}/api/v1/orders/${cartId}`, shippingAddress);
  }

  createCreditOrder(cartId:string, shippingAddress:ShippingAddress):Observable<CreditOrder|FailedOrder> {
    return this._HTTPClient.post<CreditOrder|FailedOrder>(`${BaseURL.baseURL}/api/v1/orders/checkout-session/${cartId}?url=${window.location.origin}`, shippingAddress)
  }
}
