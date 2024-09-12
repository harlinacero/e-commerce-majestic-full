import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category.model';
import { CreateProductDTO, Product, UpdateProductDTO } from 'src/app/models/product.model';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent {
  @Input() product!: UpdateProductDTO;
  @Output() formSubmited = new EventEmitter<any>();
  productForm: FormGroup;
  categories: Category[] = [];

  constructor(private fb: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private toastService: ToastService
  ) {

    this.productForm = this.fb.group({
      image: ['', Validators.required],
      title: ['', [Validators.required, Validators.minLength(5)]],
      price: [10, [Validators.required, Validators.min(10), Validators.max(1000)]],
      description: [''],
      categoryId: [0, [Validators.required, Validators.min(1), Validators.max(30)]],
      taxes: [0, [Validators.min(0), Validators.max(100)]],
      disccount: [0, [Validators.min(0), Validators.max(100)]],
      inventory: [1, [Validators.required, Validators.min(1)]],
      id: [0]
    });

  }

  ngOnInit(): void {
    if (this.product) {
      this.productForm.patchValue({
        image: this.product.image,
        title: this.product.title,
        price: this.product.price,
        description: this.product.description,
        categoryId: this.product.category?.id,
        creationAt: this.product.creationAt,
        updatedAt: this.product.updatedAt,
        taxes: this.product.taxes,
        disccount: this.product.disccount,
        inventory: this.product.inventory,
        id: this.product.id
      });
    }

    this.loadCategories();
  }


  loadCategories() {
    this.categoryService.getAll(100).subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  onSubmit(): void {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      formValue.categoryId = Number(formValue.categoryId);

      if (formValue.id && formValue.id !== 0) {
        this.updateProduct(formValue);
      } else {
        this.createProduct(formValue);
      }
    }
  }

  private updateProduct(formValue: any) {
    const product: UpdateProductDTO = formValue;
    this.productService.update(product.id, product).subscribe({
      next: (product: Product) => {
        this.toastService.showSuccess('Producto actualizado');
        this.formSubmited.emit(product);
      },
      error: (err) => {
        this.toastService.showDanger('Error al actualizar el producto');
        // console.error(err);
      },
    });
  }

  private createProduct(formValue: any) {
    const product: CreateProductDTO = formValue;
    this.productService.create(product).subscribe({
      next: (product: Product) => {
        this.toastService.showSuccess('Producto creado correctamente');
        this.formSubmited.emit(product);
      },
      error: (err) => {
        this.toastService.showDanger('Error al crear el producto');
        // console.error(err);
      },
    });
  }
}
