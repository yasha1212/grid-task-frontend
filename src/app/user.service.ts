import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'https://localhost:7246/api';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${this.apiUrl}/user`);
  }

  addUser(user: IUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/user`, user);
  }

  updateUser(user: IUser): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/user`, user);
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/user/${id}`);
  }
}
