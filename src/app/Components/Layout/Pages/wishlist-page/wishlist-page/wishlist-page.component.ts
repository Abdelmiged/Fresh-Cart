import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../../../../Services/Wishlist/wishlist.service';
import { WishlistData } from '../../../../../Interfaces/Wishlist/wishlist';
import { CartService } from '../../../../../Services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist-page',
  standalone: true,
  imports: [],
  templateUrl: './wishlist-page.component.html',
  styleUrl: './wishlist-page.component.scss'
})
export class WishlistPageComponent implements OnInit{
  wishlistData:WishlistData|null = null;
  constructor(private _Wishlist:WishlistService, private _Cart:CartService, private _ToastrService:ToastrService){}

  ngOnInit(): void {
      this._Wishlist.getUserWishlist().subscribe(res => {
        this.wishlistData = res;
        this._Wishlist.wishlistItemsCount.next((this.wishlistData?.count === undefined) ? 0 : this.wishlistData.count);
      })
  }

  addProductToCart(productId:string):void {
    this._Cart.addProductToCart(productId).subscribe(res => {
      this._Cart.cartItemsCount.next(this._Cart.cartItemsCount.getValue() + 1);
      this._ToastrService.success('Product Successfully Added to Cart', 'Added To Cart!', {
        progressBar: true,
        timeOut: 3000
      });
    });
  }

  removeItemFromWishlist($event:Event, productId:string):void {
    ($event.target as HTMLElement).closest(".wishlist-item-container")?.querySelector(".loader-container")?.classList.replace("hidden", "flex");
    this._Wishlist.removeItemFromWishlist(productId).subscribe(res => {
      ($event.target as HTMLElement).closest(".wishlist-item-container")?.remove();
      if(res?.data.length === 0)
        this._Wishlist.wishlistItemsCount.next(0);
    })
  }
}
