import { Component, Input, OnInit } from '@angular/core';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from './AlertService';

interface Alert {
  type: string;
  message: string | null;
}

@Component({
  selector: 'app-alert',
  standalone: true,
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  imports: [NgbAlertModule]
})
export class AlertComponent {
  alert!: Alert;

  constructor(private alertService: AlertService) {
    this.alert = { type: '', message: null };
  }


}

