import { NgClass } from '@angular/common';
import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgClass],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent implements OnInit,AfterViewInit{
  @Input() pages!:number;
  @Input() currentPage!:number;
  @Output() targetPage:EventEmitter<string> = new EventEmitter<string>();
  limit!:number;
  start!:number;
  bigPagination:boolean = false;

  constructor(private RendereV2:Renderer2){}

  ngOnInit(): void {
      this.initializeProperties();
  }

  ngAfterViewInit(): void {
    this.constructView();
  }
  
  initializeProperties():void {
    this.limit = (this.currentPage + 3 <= this.pages) ? this.currentPage + 3 : this.pages;

      if(this.pages >= 5 && this.pages - this.currentPage <= 3) {
        this.bigPagination = true;

        if(this.pages - this.currentPage === 0)
          this.start = this.pages - 3;
        else if(this.pages - this.currentPage === 1)
          this.start = this.currentPage - 2;
        else if(this.pages - this.currentPage === 2)
          this.start = this.currentPage - 1;
        else
          this.start = this.currentPage;
      }
      else
        this.start = (this.pages < 5) ? 1 : this.currentPage;
  }

  constructView():void {
    const paginationContainer = document.querySelector(".pagination-container");

    for(let i = this.start; i <= this.limit; i++) {
      const pageNumber = this.createPageNumber(i.toString(), (i === this.currentPage) ? true : false);
      this.RendereV2.appendChild(paginationContainer, pageNumber);

      if(i === this.limit && this.limit !== this.pages) {
        const dots = this.createDots();
        const pageNumber = this.createPageNumber(this.pages.toString());
        this.RendereV2.appendChild(paginationContainer, dots);
        this.RendereV2.appendChild(paginationContainer, pageNumber);
      }
      else if(i === this.limit && this.limit === this.pages && this.bigPagination) {
        const dots = this.createDots();
        const pageNumber = this.createPageNumber("1");
        this.RendereV2.insertBefore(paginationContainer, dots, paginationContainer?.firstChild);
        this.RendereV2.insertBefore(paginationContainer, pageNumber, paginationContainer?.firstChild);
      }
    }
  }

  createDots():HTMLDivElement {
    const dots = this.RendereV2.createElement("div");
    this.RendereV2.addClass(dots, "dots");
    this.RendereV2.setProperty(dots, "innerText", ".....");
    return dots;
  }

  createPageNumber(text:string, isCurrentPage?:boolean):HTMLDivElement {
    const pageNumber = this.RendereV2.createElement("div");
    if(isCurrentPage) {
      this.RendereV2.addClass(pageNumber, "clicked");
    }
    this.RendereV2.setProperty(pageNumber, "innerText", text);
    this.RendereV2.addClass(pageNumber, "page-number");
    this.RendereV2.listen(pageNumber, "click", this.openPage);
    return pageNumber;
  }

  private openPage = ($event?:Event):void => {
    const page = ($event!.currentTarget as HTMLDivElement).textContent;
    this.changeClickedPage(($event?.currentTarget as HTMLDivElement));
    this.targetPage.emit((page as string));
  }

  nextPage = ():void => {
    if(this.currentPage !== this.pages) {
      this.targetPage.emit((this.currentPage + 1).toString());
      let newPageNumber = Array.from(document.querySelectorAll(".page-number")).filter((item) => {
        if(item.textContent === (this.currentPage + 1).toString())
          return true;
        else
          return false;
      })[0];
      this.changeClickedPage(newPageNumber as HTMLDivElement);
    }
  }

  prevPage = ():void => {
    if(this.currentPage !== 1) {
      this.targetPage.emit((this.currentPage - 1).toString());
      let newPageNumber = Array.from(document.querySelectorAll(".page-number")).filter((item) => {
        if(item.textContent === (this.currentPage - 1).toString())
          return true;
        else
          return false;
      })[0];
      this.changeClickedPage(newPageNumber as HTMLDivElement);
    }
  }

  changeClickedPage(pageNumber:HTMLDivElement):void {
    document.querySelectorAll(".page-number").forEach((item) => {
      item.classList.remove("clicked");
    });
    this.RendereV2.addClass(pageNumber, "clicked");
  }
}