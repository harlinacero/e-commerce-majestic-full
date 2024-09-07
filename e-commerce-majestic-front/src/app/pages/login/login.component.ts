import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ShopingCarService } from 'src/app/services/shoping-car-service.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService, private storageService: StorageService,
    private shopingCartService: ShopingCarService, private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.router.navigateByUrl('/');
    }
  }

  onSubmit(f: NgForm): void {
    if (f.valid) {
      const { username, password } = this.form;
      this.authService.login(username, password).subscribe({
        next: (data) => {
          this.isLoggedIn = true;
          this.isLoginFailed = false;
          this.storageService.saveToken(data);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errorMessage = err.error;
          this.isLoginFailed = true;
        }
      });

    } else {
      this.isLoginFailed = true;
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  }


  private fakeLogin() {
    const data = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

    this.isLoggedIn = true;
    this.isLoginFailed = false;
    this.storageService.saveToken(data);
    this.router.navigateByUrl('/');
  }

  loginWithGoogle() {
    this.fakeLogin();
  }

  loginWithFacebook() {
    this.fakeLogin();
  }
}
