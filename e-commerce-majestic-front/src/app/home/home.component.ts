import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgApexchartsModule } from 'ng-apexcharts';
import { CardModule } from '../component/card/card.component';


import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';
import { BannerModule } from '../component/banner/banner.component';
import { PipesModule } from '../pipes/pipes.module';
import { ShopingCarService } from '../services/shoping-car-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  limit = 10;
  offset = 0;
  status: 'loading' | 'success' | 'error' | 'init' = 'init';
  rtaService = '';
  /**
   *
   */
  constructor(private productService: ProductService, private shopingCarService: ShopingCarService) {
    
  }


  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.status = 'loading';
    this.productService.getAllSimple().subscribe({
      next: (products) => {
        this.products = [...this.products, ...products];
        this.offset += this.limit;
        this.status = 'success';
      },
      error: (error) => {
        setTimeout(() => {
          this.products = [];
          this.status = 'error';
        }, 300);
      }
    });
  }

  addShoppingCar(product: Product) {
    this.shopingCarService.addShoppingCar(product);    
  }


}

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Home",
      urls: [{ title: "Home", url: "/home" }, { title: "Home" }],
    },
    component: HomeComponent,
  },
];
@NgModule({
  imports: [
    BannerModule,
    CardModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgApexchartsModule,
    PipesModule
  ],
  declarations: [
    HomeComponent
  ],
})
export class HomeModule { }

