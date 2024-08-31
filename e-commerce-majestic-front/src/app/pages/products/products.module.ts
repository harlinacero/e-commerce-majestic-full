import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PipesModule } from 'src/app/pipes/pipes.module';
import { ProductsComponent } from './products.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { AlertComponent } from 'src/app/component/alert/alert.component';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  }
];

@NgModule({
  declarations: [
    ProductsComponent,
    ProductFormComponent
  ],
  imports: [
    AlertComponent,
    CommonModule,
    FormsModule,
    PipesModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ]
})
export class ProductsModule { }
