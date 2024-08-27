import { Component, OnInit } from '@angular/core';
import { HomePageCarouselComponent } from "../../../Additions/home-page-carousel/home-page-carousel.component";
import { ProductsService } from '../../../../Services/Products/products.service';
import { Products } from '../../../../Interfaces/Products/products';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [HomePageCarouselComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent implements OnInit {
  productsData:Products|null = null;
  constructor(private _Products:ProductsService){}

  ngOnInit(): void {
    if(typeof localStorage !== typeof undefined)
      localStorage.setItem("currentPage", "home-page");
    this.getProducts();
  }

  getProducts():void {
    this._Products.getProducts().subscribe({
      next: (res) => {
        this.productsData = res;
      },
      error: (err) => {

      }
    })
  }
}
