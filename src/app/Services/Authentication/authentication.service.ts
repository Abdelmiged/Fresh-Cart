import { SignalResetPassword } from './../../Interfaces/SignalResetPassword/signal-reset-password';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Register } from '../../Interfaces/Register/register';
import { Login } from '../../Interfaces/Login/login';
import { BaseURL } from '../../Base/Environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationSuccess } from '../../Interfaces/AuthenticationSuccess/authentication-success';
import { AuthenticationFail } from '../../Interfaces/AuthenticationFail/authentication-fail';
import { UserData } from '../../Interfaces/UserData/user-data';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { ResetPassword } from '../../Interfaces/ResetPassword/reset-password';
import { CartService } from '../Cart/cart.service';
import { WishlistService } from '../Wishlist/wishlist.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  userData:BehaviorSubject<null|UserData> = new BehaviorSubject<null|UserData>(null);
  resetPasswordSignal:BehaviorSubject<null|SignalResetPassword> = new BehaviorSubject<null|SignalResetPassword>(null);

  constructor(private _HTTPClient:HttpClient, private _Router:Router, private _CartService:CartService, private _WishlistService:WishlistService) { }

  register(registerInfo:Register):Observable<AuthenticationSuccess | AuthenticationFail> {
    return this._HTTPClient.post<AuthenticationSuccess | AuthenticationFail>(`${BaseURL.baseURL}/api/v1/auth/signup`, registerInfo);
  }

  login(loginInfo:Login):Observable<AuthenticationSuccess | AuthenticationFail> {
    return this._HTTPClient.post<AuthenticationSuccess | AuthenticationFail>(`${BaseURL.baseURL}/api/v1/auth/signin`, loginInfo);
  }

  logout():void {
    localStorage.removeItem("userToken");
    this.userData.next(null);
    this._Router.navigate(["/login-page"]);
    this._WishlistService.wishlistItemsCount.next(0);
    this._CartService.cartItemsCount.next(0);
  }

  resetPassword(info:{email:string}):Observable<ResetPassword> {
    return this._HTTPClient.post<ResetPassword>(`${BaseURL.baseURL}/api/v1/auth/forgotPasswords`, info)
  }

  verifyCode(info:{resetCode:string}):Observable<ResetPassword> {
    return this._HTTPClient.post<ResetPassword>(`${BaseURL.baseURL}/api/v1/auth/verifyResetCode`, info);
  }

  newPassword(info:{email:string, newPassword:string}):Observable<ResetPassword|{token:string}> {
    return this._HTTPClient.put<ResetPassword|{token:string}>(`${BaseURL.baseURL}/api/v1/auth/resetPassword`, info);
  }

  decodeUserData():void {
    let token = JSON.stringify(localStorage.getItem("userToken"));
    let decodedData = jwtDecode(token);
    this.userData.next((decodedData as UserData));
  }
}
