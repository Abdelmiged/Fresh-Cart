import { Component, OnInit } from '@angular/core';
import { BrandsService } from '../../../../Services/Brands/brands.service';
import { Brands } from '../../../../Interfaces/Brands/brands';
import { FlowbiteService } from '../../../../Services/Flowbite/flowbite.service';
import { PaginationComponent } from '../../../Additions/pagination/pagination.component';

@Component({
  selector: 'app-brands-page',
  standalone: true,
  imports: [PaginationComponent],
  templateUrl: './brands-page.component.html',
  styleUrl: './brands-page.component.scss'
})
export class BrandsPageComponent implements OnInit {
  brandsData:Brands|null = null;
  constructor(private _BrandsService:BrandsService, private _FlowbiteService:FlowbiteService){}

  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite(() => {})
    if(typeof localStorage !== typeof undefined)
      localStorage.setItem("currentPage", "brands-page");
    this.getAllBrands();
  }

  getAllBrands(page?:string):void {
    this._BrandsService.getAllBrands(page).subscribe(res => {
      this.brandsData = res;
    })
  }

  openModal(image:string, name:string):void {
    let modalContainer = document.querySelector(".modal-container");
    let modalImage = document.querySelector(".modal-image");
    let modalHeader = document.querySelector(".modal-header");
    
    modalContainer?.classList.replace("invisible", "visible");
    modalContainer?.classList.replace("top-[-40%]", "top-0");
    document.querySelector(".modal-popup")?.classList.replace("opacity-0", "opacity-100");
    modalImage?.setAttribute("src", image);
    modalImage?.setAttribute("alt", name);
    modalHeader!.textContent = name;
  }

  closeModal():void {
    let modalContainer = document.querySelector(".modal-container");
    let modalPopup = document.querySelector(".modal-popup");

    modalContainer?.classList.replace("top-0", "top-[-40%]");
    modalPopup?.classList.replace("opacity-100", "opacity-0");
    modalContainer?.classList.replace("visible", "invisible");
  }
}
