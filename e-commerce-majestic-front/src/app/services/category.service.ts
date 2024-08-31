import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category.model';
import { map, Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private apiUrl = `${environment.API_URL}/api`;

  constructor(
    private http: HttpClient
  ) { }

  getAll(limit: number): Observable<Category[]> {
    // return this.http.get(`${this.apiUrl}/categories?limit=${limit}`);

    return this.http.get<Category[]>(`${this.apiUrl}/category/`)
      .pipe(
        retry(3),
        map(categories => categories));
  }
}
