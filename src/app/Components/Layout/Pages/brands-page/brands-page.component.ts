import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-brands-page',
  standalone: true,
  imports: [],
  templateUrl: './brands-page.component.html',
  styleUrl: './brands-page.component.scss'
})
export class BrandsPageComponent implements OnInit {
  ngOnInit(): void {
    if(typeof localStorage !== typeof undefined)
      localStorage.setItem("currentPage", "brands-page");
  }
}
