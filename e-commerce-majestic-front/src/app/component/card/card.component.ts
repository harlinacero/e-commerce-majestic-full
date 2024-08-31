import { Component, Input, NgModule, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: [ './card.component.scss' ]
})
export class CardComponent implements OnInit {

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
    CardComponent
  ],
  exports: [
    CardComponent
  ]
})
export class CardModule { }