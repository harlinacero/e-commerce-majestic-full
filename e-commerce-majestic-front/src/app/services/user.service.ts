import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private apiUrl = `${environment.API_URL}/api`;
  
  constructor(private http: HttpClient) { }
  
  CreateUser(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/user/`, user);
  }

  UpdateUser(user: User): Observable<any> {
    return this.http.put<User>(`${this.apiUrl}/user/${user.id}`, user);
  }
  
  Delete(id: string) {
    return this.http.delete<boolean>(`${this.apiUrl}/user/${id}`);
  }
  
  GetAll(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/user/`);
  }
  
  GetUsersByRole(roleId: number) {    
    return this.http.get<User[]>(`${this.apiUrl}/user/userByRole/${roleId}`);
  }
}
