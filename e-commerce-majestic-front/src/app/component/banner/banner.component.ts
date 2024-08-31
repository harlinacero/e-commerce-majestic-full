import { Component, Input, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: [ './banner.component.scss' ]
})
export class BannerComponent implements OnInit {

  @Input() title!: string;
  @Input() image!: string | undefined;
  @Input() imagealt!: string;
  @Input() text!: string;
  @Input() btnConfirmText!: string;


  /**
   *
   */
  constructor() {

  }

  ngOnInit(): void {
  }

  onConfirmClick() {

  }
}

@NgModule({
  imports: [
  ],
  declarations: [
    BannerComponent
  ],
  exports: [
    BannerComponent
  ]
})
export class BannerModule { }