import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../../Services/Cart/cart.service';
import { Cart, Product } from '../../../../Interfaces/Cart/cart';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [NgClass, RouterLink],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.scss'
})
export class CartPageComponent implements OnInit {
  loading:boolean = true;
  userCart:Cart|null = null;
  constructor(private _Cart:CartService, private _ToastrService:ToastrService){}
  ngOnInit(): void {
    if(typeof localStorage !== typeof undefined)
      localStorage.setItem("currentPage", "cart-page");
    this.getUserCart();
  }

  getUserCart():void {
    this._Cart.getUserCart().subscribe(res => {
      this.userCart = res;
      this._Cart.cartItemsCount.next(this.addCartItemsCount(this.userCart!.data.products));
      this.loading = false;
    })
  }

  removeItem($event:Event, productId:string) {
    ($event.target as HTMLElement).closest(".cart-item-container")?.querySelector(".loader-container")?.classList.replace("hidden", "flex");
    this._Cart.removeItem(productId).subscribe(res => {
      this.userCart = res;
      this._Cart.cartItemsCount.next(this.addCartItemsCount(this.userCart!.data.products));
      this._ToastrService.success("Product Successfully removed from cart", "Removed from Cart!", {
        progressBar: true,
        timeOut: 3000
      });
    });
  }
  
  increaseProductQuantity(productId:string, count:number):void {
    this._Cart.updateProductQuantity(productId, count).subscribe(res => {
      this.userCart = res;
      this._Cart.cartItemsCount.next(this.addCartItemsCount(this.userCart!.data.products));
    })
  }

  decreaseProductQuantity(productId:string, count:number, $event:Event):void {
    if(count === 0) {
      this.removeItem($event, productId);
      this._Cart.cartItemsCount.next(0);
      return;
    }
    this._Cart.updateProductQuantity(productId, count).subscribe(res => {
      this.userCart = res;
      this._Cart.cartItemsCount.next(this.addCartItemsCount(this.userCart!.data.products));
    })
  }

  clearCart():void {
    document.querySelectorAll(".loader-container").forEach(elmnt => {
      elmnt.classList.replace("hidden", "flex");
    })
    this._Cart.clearCart().subscribe(res => {
      this.userCart = null;
      this._Cart.cartItemsCount.next(0);
    });
  }

  addCartItemsCount(products:Product[]):number {
    let totalCount:number = 0;
    products.forEach((item) => {
      totalCount += item.count;
    })
    return totalCount;
  }
}
