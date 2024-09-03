import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Wishlist, WishlistData } from '../../Interfaces/Wishlist/wishlist';
import { BaseURL } from '../../Base/Environment';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  wishlistItemsCount:BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor(private _HTTPClient:HttpClient, private _ToastrService:ToastrService) { }

  addProductToWishlist(productId:string):Observable<null|Wishlist> {
    return this._HTTPClient.post<null|Wishlist>(`${BaseURL.baseURL}/api/v1/wishlist`, {productId:productId})
  }

  getUserWishlist():Observable<null|WishlistData> {
    return this._HTTPClient.get<null|WishlistData>(`${BaseURL.baseURL}/api/v1/wishlist`);
  }

  removeItemFromWishlist(productId:string):Observable<null|Wishlist> {
    return this._HTTPClient.delete<null|Wishlist>(`${BaseURL.baseURL}/api/v1/wishlist/${productId}`);
  }

  frontAddProductToWishlist($event:Event, productId:string):void {
    let heartFilled:HTMLElement = ($event.currentTarget as HTMLElement).querySelector(".heart-filled")!;
    let heartHollow:HTMLElement = ($event.currentTarget as HTMLElement).querySelector(".heart-hollow")!;

    this.getUserWishlist().subscribe(res => {
      let found:boolean = false;
      for(let i = 0; i < res!.data.length; i++) {
        if(res!.data[i]._id === productId) {
          found = true;
          break;
        }
      }

      if(!found) {
        this.addProductToWishlist(productId).subscribe(res => {
          heartFilled.classList.replace("hidden", "inline-block");
          heartHollow.classList.replace("inline-block", "hidden");
          this._ToastrService.success('Product Successfully Added to Wishlist', 'Added To Wishlist!', {
            progressBar: true,
            timeOut: 3000
          });
          this.wishlistItemsCount.next(this.wishlistItemsCount.getValue() + 1);
        })
      }
      else {
        this.removeItemFromWishlist(productId).subscribe(res => {
          heartFilled.classList.replace("inline-block", "hidden");
          heartHollow.classList.replace("hidden", "inline-block");
          this._ToastrService.success("Proudct removed from Wishlist.", "Product Removed!", {
            progressBar: true,
            timeOut: 3000
          })
          this.wishlistItemsCount.next((this.wishlistItemsCount.getValue() === 0) ? 0 : this.wishlistItemsCount.getValue() - 1);
        })
      }
    })
  }
}