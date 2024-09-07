import { Component } from '@angular/core';
import { ModalService } from 'src/app/component/modal/ModalService';
import { ShopingCar } from 'src/app/models/product.model';
import { ShopingCarService } from 'src/app/services/shoping-car-service.service';

@Component({
  selector: 'app-shoppingcart',
  templateUrl: './shoppingcart.component.html',
  styleUrls: ['./shoppingcart.component.scss']
})
export class ShoppingcartComponent {
  products: ShopingCar[] = [];
  currentPage = 0;
  itemsPerPage = 5;
  totalPages = 0;
  total = 0;


  constructor(private shoppingCarService: ShopingCarService, private modalService: ModalService) {
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  ngOnDestroy(): void {

  }

  getAllProducts() {
    this.shoppingCarService.shoppingCar$.subscribe({
      next: (shoppingCar) => {
        this.products = shoppingCar;
        this.calculateTotal();
      }
    });
  }


  calculateTotal() {
    this.total = this.products.reduce((acc, p) => acc + p.product.price * p.quantity, 0);
  }


  

  delete(product: ShopingCar) {
    this.shoppingCarService.deleteProduct(product);
    this.calculateTotal();
  }

  checkout() {

  }
}


