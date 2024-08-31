import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ValidateImagePipe } from './validate-image.pipe';



@NgModule({
  declarations: [
    ValidateImagePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ValidateImagePipe
  ]
})
export class PipesModule { }
