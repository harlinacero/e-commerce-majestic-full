import { Component, OnInit } from '@angular/core';
import { Product, TopSelling } from './top-selling-data';

@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html'
})
export class TopSellingComponent implements OnInit {

  topSelling: Product[] = [];
  paginatedTopSelling: Product[] = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalPages = 0;
  totalPagesArray: number[] = [];

  constructor() {

   
  }

  ngOnInit(): void {
    this.topSelling = TopSelling;
    this.totalPages = Math.ceil(this.topSelling.length / this.itemsPerPage);
    this.totalPagesArray = Array(this.totalPages).fill(0).map((x, i) => i + 1);
    this.updatePaginatedList();
  }

  updatePaginatedList() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedTopSelling = this.topSelling.slice(startIndex, endIndex);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    this.updatePaginatedList();
  }

}
