import { Injectable, TemplateRef } from '@angular/core';

export interface Toast {
  textOrTpl: string | TemplateRef<any>;
  template?: TemplateRef<any>;
  classname?: string;
  delay?: number;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toasts: Toast[] = [];

  // show(toast: Toast) {
  // 	this.toasts.push(toast);
  // }

  // remove(toast: Toast) {
  // 	this.toasts = this.toasts.filter((t) => t !== toast);
  // }

  // clear() {
  // 	this.toasts.splice(0, this.toasts.length);
  // }

  show(textOrTpl: string | TemplateRef<any>, options: any = {}) {
    this.toasts.push({ textOrTpl, ...options });
  }

  showSuccess(textOrTpl: string | TemplateRef<any>) {
    const options: Toast = { 
      classname: 'bg-success text-light', 
      delay: 10000,
      textOrTpl: textOrTpl
     };
    this.toasts.push({ ...options });
  }

  showDanger(textOrTpl: string | TemplateRef<any>) {
    const options: Toast = { 
      classname: 'bg-danger text-light', 
      delay: 10000,
      textOrTpl: textOrTpl
     };
    this.toasts.push({ ...options });
  }

  remove(toast: any) {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
