import { Component } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { NgFor, NgIf } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-video',
  standalone: true,
  imports: [NgbAlertModule, NgFor, NgIf],
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent {
  imageList: MetadataImg[] = [];

  constructor(private sanitizer: DomSanitizer) { 
    this.imageList = videoList;
  }
 
}

export interface MetadataImg {
  url: string;
  name: string;
  alt: string;
}

export const videoList: MetadataImg[] = [
  {
    url: 'https://media.istockphoto.com/id/1346143621/es/foto/mujer-joven-de-raza-mixta-positiva-usando-una-computadora-port%C3%A1til-y-un-tel%C3%A9fono-inteligente.jpg?s=2048x2048&w=is&k=20&c=24IjxiGbsUi773nb8B8TTaSfHG-TlkaPGo0sYY0V0Tc=',
    name: 'Trabaja desde casa',
    alt: 'Mujer joven positiva usando una computadora portátil y un teléfono inteligente en casa.'
  },
  {
    url: 'https://media.istockphoto.com/id/1320686310/es/foto/hombre-de-negocios-que-trabaja-desde-casa.jpg?s=2048x2048&w=is&k=20&c=K1f-_VAllKMskbBpTQwkdVTtPkOEfvjsvw7TXnUkE-M=',
    name: 'Recibe donde estés',
    alt: 'Hombre de negocios que trabaja desde casa'
  },
  {
    url: 'https://media.istockphoto.com/id/1445581243/es/foto/joven-cauc%C3%A1sico-en-un-espacio-de-coworking-usando-una-tableta.jpg?s=2048x2048&w=is&k=20&c=j4ZgjbDbr2SlVlvsQCwBWm2MNE6fJma7ypik02LhJMI=',
    name: 'Encuentra lo que necesites',
    alt: 'Joven en un espacio de coworking usando una tableta'
  },
  {
    url: 'https://cdn.pixabay.com/photo/2016/03/27/07/12/apple-1282241_1280.jpg',
    name: 'Miles de productos para ti',
    alt: ''
  },
  {
    url: 'https://cdn.pixabay.com/photo/2016/12/09/11/33/smartphone-1894723_1280.jpg',
    name: 'Todo al alcance de un clic',
    alt: 'Usando el celular'
  }
]