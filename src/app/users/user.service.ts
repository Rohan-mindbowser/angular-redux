import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Users } from './store/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers() {
    return this.http.get<Users[]>('http://localhost:3000/users');
  }
}
