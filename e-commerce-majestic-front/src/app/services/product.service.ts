import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { retry, catchError, map } from 'rxjs/operators';
import { Observable, throwError, zip } from 'rxjs';

import { environment } from 'src/environments/environment';
import { Product, UpdateProductDTO, CreateProductDTO } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${environment.API_URL}/api`;

  constructor(
    private http: HttpClient
  ) { }

  getByCategory(categoryId: string, limit?: number, offset?: number) {
    let params = new HttpParams();
    if (limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/categories/${categoryId}/product`, { params })
  }

  getAllSimple() {
    return this.http.get<Product[]>(`${this.apiUrl}/product/`)
  }

  getAll(limit?: number, offset?: number): Observable<Product[]> {
    let params = new HttpParams();
    if (limit && offset != null) {
      params = params.set('limit', limit);
      params = params.set('offset', offset);
    }
    return this.http.get<Product[]>(`${this.apiUrl}/product/`, { params })
      .pipe(
        retry(3),
        map(products => products.map(item => {
          return {
            ...item,
            taxes: item.price > 0 ? .19 * item.price : 0
          }
        }))
      );
  }

  fetchReadAndUpdate(id: number, dto: UpdateProductDTO) {
    return zip(
      this.getOne(id),
      this.update(id, dto)
    );
  }

  getOne(id: number) {
    return this.http.get<Product>(`${this.apiUrl}/product/${id}`)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.Conflict) {
            return throwError(() => 'Algo esta fallando en el server');
          }
          if (error.status === HttpStatusCode.NotFound) {
            return throwError(() => 'El producto no existe');
          }
          if (error.status === HttpStatusCode.Unauthorized) {
            return throwError(() => 'No estas permitido');
          }
          return throwError(() => 'Unauthorized');
        })
      )
  }

  create(dto: CreateProductDTO) {
    return this.http.post<Product>(`${this.apiUrl}/product`, dto);
  }

  update(id: number, dto: UpdateProductDTO) {
    return this.http.put<Product>(`${this.apiUrl}/product/${id}`, dto);
  }

  delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/product/${id}`);
  }
}
