import { Component } from '@angular/core';
import { ModalService } from 'src/app/component/modal/ModalService';

import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';
import { ProductFormComponent } from './product-form/product-form.component';
import { AlertService } from 'src/app/component/alert/AlertService';
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: Product[] = [];
  currentPage = 0;
  itemsPerPage = 5;
  totalPages = 0;


  constructor(private productService: ProductService, private modalService: ModalService,
    private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.getAllProducts(this.itemsPerPage, this.currentPage);
  }

  ngOnDestroy(): void {

  }

  getAllProducts(limit: number, offset: number) {
    this.productService.getAllSimple().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        setTimeout(() => {
          this.products = [];
          console.error(error);
        }, 300);
      }
    });
  }

  changePage(page: number) {
    if (page < 1) {
      return;
    }
    this.currentPage = page;
    this.getAllProducts(this.itemsPerPage, this.currentPage);
  }

  open(product?: Product) {
    const modalOptions = {
      size: 'lg',
      animation: true,
      centered: true,
      scrollable: true,
      isConfirmDialog: false,
      useTemplate: false
    };

    const title = product ? 'Editar Producto' : 'Nuevo Producto';
    const data = {
      product: product
    };
    this.modalService.openModal(ProductFormComponent, title, data, modalOptions);
    this.getAllProducts(this.itemsPerPage, this.currentPage);
  }

  delete(product: Product) {
    this.productService.delete(product.id.toString())
      .subscribe({
        next: (response) => {
          this.toastService.showSuccess('Producto eliminado');
          this.getAllProducts(this.itemsPerPage, this.currentPage);
        },
        error: (error) => {
          this.toastService.showDanger('Error al eliminar el producto');
          console.error(error);
        }
      });
  }
}
