import { Injectable } from '@angular/core';
import { Product, ShopingCar } from '../models/product.model';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShopingCarService {
  
  private shoppingCar: ShopingCar[] = [];
  private shoppingCarSubject = new BehaviorSubject<ShopingCar[]>([]);
  private apiUrl = `${environment.API_URL}/api`;

  shoppingCar$ = this.shoppingCarSubject.asObservable();


  constructor(
    private http: HttpClient
  ) { }

  addShoppingCar(product: Product) {
    const index = this.shoppingCar.findIndex((p) => p.product.id === product.id);
    if(index >= 0 ) {
      this.shoppingCar[index].quantity++;
    } else {
      this.shoppingCar.push({product, quantity: 1});
    }
    this.udpateShopingCart().subscribe({
      next: (data) => {
        this.shoppingCarSubject.next(this.shoppingCar);
      }
    });
    // this.shoppingCarSubject.next(this.shoppingCar);
  }

  getProductShoppingCar(): ShopingCar[] {
    if(this.shoppingCar.length === 0) {
      this.getShopingCart().subscribe({
        next: (data) => {
          this.shoppingCar = data;
          this.shoppingCarSubject.next(this.shoppingCar);
        }
      });
    }
    return this.shoppingCar;
  }

  deleteProduct(product: ShopingCar) {
    const index = this.shoppingCar.findIndex((p) => p.product.id === product.product.id);
    if(index >= 0) {
      this.shoppingCar[index].quantity--;
      if(this.shoppingCar[index].quantity === 0) {
        this.shoppingCar.splice(index, 1);
      }
    }
    this.udpateShopingCart();

  }

  private udpateShopingCart() {
    return this.http.post<ShopingCar[]>(`${this.apiUrl}/shoppingcart/`, this.shoppingCar);
  }

  private getShopingCart() {
    return this.http.get<ShopingCar[]>(`${this.apiUrl}/shoppingcart/`);
  }
}
