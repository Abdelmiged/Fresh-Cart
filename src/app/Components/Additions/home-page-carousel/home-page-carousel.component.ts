import { Component, OnInit } from '@angular/core';
import { Categories } from '../../../Interfaces/Categories/categories';
import { CategoriesService } from '../../../Services/Categories/categories.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { NgClass } from '@angular/common';
import { BannerCarouselComponent } from "../BannerCarousel/banner-carousel/banner-carousel.component";

@Component({
  selector: 'app-home-page-carousel',
  standalone: true,
  imports: [CarouselModule, NgClass, BannerCarouselComponent],
  templateUrl: './home-page-carousel.component.html',
  styleUrl: './home-page-carousel.component.scss'
})
export class HomePageCarouselComponent implements OnInit{
  categoriesData:Categories | null = null;

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
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      },
      1280: {
        items: 7
      },
    },
    nav: true,
    lazyLoad: true,
    autoplay: true,
    lazyLoadEager: 1
  }

  constructor(private _Categories:CategoriesService){}

  ngOnInit(): void {
      this.getCategories();
  }

  getCategories():void {
    this._Categories.getCategories().subscribe({
      next: (res) => {
        this.categoriesData = res;
      },
      error: (err) => {

      }
    })
  }
}
