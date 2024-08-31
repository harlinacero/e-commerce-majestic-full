import { Component, inject, TemplateRef } from '@angular/core';
import { CommonModule, NgTemplateOutlet } from '@angular/common';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

import { ToastService } from 'src/app/services/toast.service';


@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, NgbToastModule, NgTemplateOutlet],
  templateUrl: './toast.component.html',
  host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' }
})
export class ToastComponent {
  toastService = inject(ToastService);

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  isTemplate(value: any): value is TemplateRef<any> {
    return value instanceof TemplateRef;
  }
}
