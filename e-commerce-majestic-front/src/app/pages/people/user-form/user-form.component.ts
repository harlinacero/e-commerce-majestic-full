import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Role, User } from 'src/app/models/User';
import { RoleService } from 'src/app/services/role.service';
import { ToastService } from 'src/app/services/toast.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent {
  @Input() user!: User;
  @Output() formSubmited = new EventEmitter<any>();
  userForm: FormGroup;
  roles: Role[] = [];

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private roleService: RoleService,
    private toastService: ToastService
  ) {

    this.userForm = this.fb.group({
      id: [0],
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      roleId: [0, Validators.required],
      avatar: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword : ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.passwordMatchValidator });

  }

  ngOnInit(): void {
    if (this.user) {
      this.userForm.patchValue({
        username: this.user.username,
        email: this.user.email,
        avatar: this.user.avatar,
        id: this.user.id,
        roleId: this.user.roleId,
      });
    }

    this.loadRoles();
  }

  passwordMatchValidator(formGroup: FormGroup): any {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
  
    return password === confirmPassword ? null : { mismatch: true };
  }

  loadRoles() {
    this.roleService.GetAll().subscribe({
      next: (roles) => {
        this.roles = roles;
      },
      error: (error) => {
        console.error(error);
      }
    });
  }


  onSubmit(): void {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
      formValue.roleId = Number(formValue.roleId);

      if (formValue.id && formValue.id !== 0) {
        this.updateuser(formValue);
      } else {
        this.createuser(formValue);
      }
    }
  }

  private updateuser(formValue: any) {
    const user: User = formValue;
    this.userService.UpdateUser(user).subscribe({
      next: (user: User) => {
        this.toastService.showSuccess('Usuario actualizado');
        this.formSubmited.emit(user);
      },
      error: (err) => {
        this.toastService.showDanger('Error al actualizar el usuario');
        // console.error(err);
      },
    });
  }

  private createuser(formValue: any) {
    const user: User = formValue;
    this.userService.CreateUser(user).subscribe({
      next: (user: User) => {
        this.toastService.showSuccess('Usuario creado correctamente');
        this.formSubmited.emit(user);
      },
      error: (err) => {
        this.toastService.showDanger('Error al crear el usuario');
        // console.error(err);
      },
    });
  }
}
