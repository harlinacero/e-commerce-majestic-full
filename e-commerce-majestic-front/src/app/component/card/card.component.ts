import { Component, EventEmitter, Input, NgModule, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input() id!: number;
  @Input() title!: string;
  @Input() image!: string | undefined;
  @Input() imagealt!: string;
  @Input() text!: string;
  @Input() btnConfirmText!: string;

  @Output() cardSelected =new EventEmitter<number>();

  /**
   *
   */
  constructor() {

  }

  ngOnInit(): void {
  }

  onConfirmClick() {
    this.cardSelected.emit(this.id);
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