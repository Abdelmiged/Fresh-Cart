import { Component, OnInit } from '@angular/core';
import { HomePageCarouselComponent } from "../../../Additions/home-page-carousel/home-page-carousel.component";
import { ProductsService } from '../../../../Services/Products/products.service';
import { Products } from '../../../../Interfaces/Products/products';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../../../Pipes/Search/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../../Services/Cart/cart.service';
import { WishlistService } from '../../../../Services/Wishlist/wishlist.service';
import { PaginationComponent } from '../../../Additions/pagination/pagination.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HomePageCarouselComponent, RouterLink, SearchPipe, FormsModule, PaginationComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  searchWord:string = "";
  productsData:Products|null = null;
  constructor(private _Products:ProductsService, protected _Cart:CartService, protected _Wishlist:WishlistService){}

  ngOnInit(): void {
    if(typeof localStorage !== typeof undefined)
      localStorage.setItem("currentPage", "home-page");
    this.getProducts();
  }

  getProducts(page?:string):void {
    this._Products.getProducts(page).subscribe({
      next: (res) => {
        this.productsData = res;
      },
      error: (err) => {

      }
    })
  }
}
