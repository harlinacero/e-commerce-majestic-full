import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { AlertComponent } from "src/app/component/alert/alert.component";
import { PipesModule } from "src/app/pipes/pipes.module";
import { ShoppingcartComponent } from "./shoppingcart.component";

export const routes: Routes = [
  {
    path: '',
    component: ShoppingcartComponent
  }
];

@NgModule({
  declarations: [
    ShoppingcartComponent
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
export class ShoppingcartModule {
}
