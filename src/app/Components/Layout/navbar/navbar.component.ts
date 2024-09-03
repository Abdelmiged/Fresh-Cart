import { AfterViewInit, Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FlowbiteService } from '../../../Services/Flowbite/flowbite.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthenticationService } from '../../../Services/Authentication/authentication.service';
import { CartService } from '../../../Services/Cart/cart.service';
import { WishlistService } from '../../../Services/Wishlist/wishlist.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit,AfterViewInit {
  platformId:Object = inject(PLATFORM_ID);
  constructor(private _FlowbiteService:FlowbiteService, protected _Authentication:AuthenticationService, private _Router:Router, protected _CartService:CartService, protected _Wishlist:WishlistService) {}
  tooltip!:HTMLElement;

  ngOnInit(): void {
      this._FlowbiteService.loadFlowbite(flowbite => {})
      if(isPlatformBrowser(this.platformId)) {
        this._CartService.getUserCart().subscribe(res => {
          this._CartService.cartItemsCount.next((res?.numOfCartItems === undefined) ? 0 : res.numOfCartItems)
        });
        this._Wishlist.getUserWishlist().subscribe(res => {
          this._Wishlist.wishlistItemsCount.next((res?.count === 0) ? 0 : res!.count);
        })
      }
  }

  ngAfterViewInit(): void {
    if(isPlatformBrowser(this.platformId)) {
      this.tooltip = document.querySelector('#tooltip-top') as HTMLElement;
    }
  }
}
