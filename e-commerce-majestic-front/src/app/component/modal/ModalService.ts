import { Injectable, Type } from "@angular/core";
import { NgbModal, NgbModalOptions } from "@ng-bootstrap/ng-bootstrap";
import { ModalComponent } from "./modal.component";


@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(private modalService: NgbModal) { }

  openModal(component: Type<any> | null, title: string, data?:any, modalOptions?: ModalOptions) {
    const modalRef = this.modalService.open(ModalComponent, modalOptions);
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.component = component;
    modalRef.componentInstance.useTemplate = modalOptions?.useTemplate;
    modalRef.componentInstance.isConfirmDialog = modalOptions?.isConfirmDialog;
    if(data) {
      Object.keys(data).forEach(key => {
        modalRef.componentInstance[key] = data[key];
      });
      modalRef.componentInstance['data'] = data;
    }
  }
}

export interface ModalOptions extends NgbModalOptions {
  isConfirmDialog: boolean;
  useTemplate: boolean;
}


