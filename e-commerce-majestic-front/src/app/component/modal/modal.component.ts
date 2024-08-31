import { Component, ComponentFactoryResolver, ComponentRef, inject, Input, OnInit, Type, ViewChild, ViewContainerRef } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

	@Input() title: string = '';
  @Input() component!: Type<any>;
  @Input() data: any;
  @Input() useTemplate: boolean = false;
  @Input() isConfirmDialog: boolean = false;

  @ViewChild('dynamicComponent', { read: ViewContainerRef, static: true }) dynamicComponent!: ViewContainerRef;

  constructor(public activeModal: NgbActiveModal) {     
  }

  
  ngOnInit() {
    this.loadComponent();    
  }

  loadComponent() {
    if(this.dynamicComponent) {

      this.dynamicComponent.clear();
      const componentRef: ComponentRef<any> = this.dynamicComponent.createComponent(this.component);
  
      if(this.data) {
        Object.keys(this.data).forEach(key => {
          componentRef.instance[key] = this.data[key];
        });
      }
  
      if(componentRef.instance['formSubmited']) {
        componentRef.instance['formSubmited'].subscribe((data: any) => {
          this.activeModal.close(data);
        });
      }
    }
  }
}

