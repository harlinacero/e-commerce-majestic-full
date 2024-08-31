import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/User';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor() { }

  private hasToken(): boolean {
    return !!window.sessionStorage.getItem(USER_KEY);
  }

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any{
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return jwtDecode(user);
    }

    return null;
  }

  public isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  get isLoggedIn$() {
    return this.loggedIn.asObservable();
  }

  saveToken(token: string): void {
    window.sessionStorage.setItem(USER_KEY, token);
    this.loggedIn.next(true);
  }

  getToken(): string | null {
    return window.sessionStorage.getItem(USER_KEY);
  }

  logout(): void {
    window.sessionStorage.removeItem(USER_KEY);
    this.loggedIn.next(false);
    window.location.reload();
  }
}
