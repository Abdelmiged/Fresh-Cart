import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../../../Services/Products/products.service';
import { CartService } from '../../../../Services/Cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../../../Services/Wishlist/wishlist.service';
import { Products } from '../../../../Interfaces/Products/products';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../../../Pipes/Search/search.pipe';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from '../../../Additions/pagination/pagination.component';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [RouterLink, SearchPipe, FormsModule, PaginationComponent],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnInit {
  searchWord:string = "";
  productsData:Products|null = null;
  constructor(private _Products:ProductsService, protected _Cart:CartService, protected _Wishlist:WishlistService){}

  ngOnInit(): void {
    if(typeof localStorage !== typeof undefined)
      localStorage.setItem("currentPage", "products-page");
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
