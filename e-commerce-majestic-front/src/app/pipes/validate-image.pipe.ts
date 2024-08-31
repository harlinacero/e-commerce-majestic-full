import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validateImage'
})
export class ValidateImagePipe implements PipeTransform {

  transform(images: string[], ...args: unknown[]): string {
    if (images.length > 0) {
      try {
        return JSON.parse(images[ 0 ]);
      } catch (error) {
        return images[ 0 ];
      }
    }

    return 'https://e7.pngegg.com/pngimages/829/733/png-clipart-logo-brand-product-trademark-font-not-found-logo-brand.png';
  }

}
