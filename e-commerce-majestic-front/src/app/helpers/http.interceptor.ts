import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  
  private token: string | null = null;

  constructor(private storageService: StorageService) {
    this.token = this.storageService.getToken();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.token = this.storageService.getToken();
    if(this.token) {
      req = req.clone({
        // withCredentials: true,
        headers: req.headers.set('Authorization', `Bearer ${this.token}`)
      });
    }



    return next.handle(req);
  }
}

// export const httpInterceptorProviders = [
//   { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
// ];