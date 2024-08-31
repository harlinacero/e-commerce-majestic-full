import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Role, User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  private apiUrl = `${environment.API_URL}/api`;
  
  constructor(private http: HttpClient) { }

  GetAll(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/role/`);
  }
}
