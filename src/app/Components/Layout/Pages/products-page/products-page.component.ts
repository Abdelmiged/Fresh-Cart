import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.scss'
})
export class ProductsPageComponent implements OnInit {
  ngOnInit(): void {
    if(typeof localStorage !== typeof undefined)
      localStorage.setItem("currentPage", "products-page");
  }
}
