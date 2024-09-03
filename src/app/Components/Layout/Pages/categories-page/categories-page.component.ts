import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../../../Services/Categories/categories.service';
import { Categories, Category } from '../../../../Interfaces/Categories/categories';
import { PaginationComponent } from '../../../Additions/pagination/pagination.component';

@Component({
  selector: 'app-categories-page',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './categories-page.component.html',
  styleUrl: './categories-page.component.scss'
})
export class CategoriesPageComponent implements OnInit {
  subCategoriesData:Category[]|null = null;
  mainCategory!:string;
  categoriesData:Categories|null = null;
  constructor(private _CategoriesService:CategoriesService){}
  ngOnInit(): void {
    if(typeof localStorage !== typeof undefined)
      localStorage.setItem("currentPage", "categories-page");
    this.getCategories();
  }

  getCategories(page?:string):void {
    this._CategoriesService.getCategories(page).subscribe(res => {
      this.categoriesData = res;
    })
  }

  getSubcategoriesOnCategory(productId:string, mainCategory:string):void {
    this.mainCategory = mainCategory;
    this._CategoriesService.getSubcategoriesOnCategory(productId).subscribe(res => {
      this.subCategoriesData = res.data;
    })
  }
}
