import { Component, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from '../../../../../Services/Products/products.service';
import { Product } from '../../../../../Interfaces/Products/products';
import { ActivatedRoute } from '@angular/router';
import { CartService } from '../../../../../Services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../../../Services/Wishlist/wishlist.service';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './product-details-page.component.html',
  styleUrl: './product-details-page.component.scss'
})
export class ProductDetailsPageComponent implements OnInit{
  productData:Product|null = null;
  productID!:string;

  constructor(private _ProductsService:ProductsService, private _ActivatedRoute:ActivatedRoute, protected _Cart:CartService, protected _Wishlist:WishlistService){}

  carouselOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
    nav: true,
    lazyLoad: true,
    autoplay: true,
  }

  ngOnInit(): void {
      this.getSpecificProduct();
  }

  getSpecificProduct():void {
    this._ActivatedRoute.params.subscribe(res => {
      this.productID = res['id'];
    });
    this._ProductsService.getSpecificProduct(this.productID).subscribe(res => {
      this.productData = res!.data
    });
  }
}
