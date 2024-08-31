import { Component, OnInit } from '@angular/core';
import { ModalService } from 'src/app/component/modal/ModalService';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { UserFormComponent } from './user-form/user-form.component';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  people!: User[];
  currentPage = 0;
  
  constructor(private userService: UserService, private modalService: ModalService) {
    
  }

  ngOnInit(): void {
    this.userService.GetAll().subscribe((data: User[]) => {
      this.people = data;
    });
  }

  open(user?: User) {
    const modalOptions = {
      size: 'lg',
      animation: true,
      centered: true,
      scrollable: true,
      isConfirmDialog: false,
      useTemplate: false
    };

    const title = user ? 'Editar Usuario' : 'Nuevo Usuario';
    const data = {
      user: user
    };
    this.modalService.openModal(UserFormComponent, title, data, modalOptions);
  }

  delete(user?: User) {
    const modalOptions = {
      size: 'lg',
      animation: true,
      centered: true,
      scrollable: true,
      isConfirmDialog: true,
      useTemplate: false
    };

    const title = 'Eliminar Usuario';
    this.modalService.openModal(null, title, user, modalOptions);
  }

  changePage(page: number) {
    if (page < 1) {
      return;
    }
    this.currentPage = page;
    this.userService.GetAll().subscribe((data: User[]) => {
      this.people = data;
    });
  }

}
