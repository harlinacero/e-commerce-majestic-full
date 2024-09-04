import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup; 

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router) {

    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email]],
      avatar: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword : ['', [Validators.required, Validators.minLength(6)]]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup): any {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
  
    return password === confirmPassword ? null : { mismatch: true };
  }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.router.navigateByUrl('/');
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const newUser: User = this.userForm.value;
      newUser.roleId = 3;
      this.userService.CreateUser(newUser).subscribe({
        next: (data) => {
          this.login();
        },
        error: (err) => {
          this.errorMessage = err.message;
          this.isLoginFailed = true;
        }
      });

    } else {
      this.isLoginFailed = true;
      this.errorMessage = 'Existen campos inválidos';
    }
  }


  login() {
    const { username, password } = this.userForm.value;
    this.authService.login(username, password).subscribe({
      next: (data) => {
        this.isLoggedIn = true;
        this.isLoginFailed = false;
        this.storageService.saveToken(data);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.errorMessage = err.message;
        this.isLoginFailed = true;
      }
    });
  }
}






