import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.scss'
})
export class CategoriesPageComponent implements OnInit {
  ngOnInit(): void {
    if(typeof localStorage !== typeof undefined)
      localStorage.setItem("currentPage", "categories-page");
  }
}
