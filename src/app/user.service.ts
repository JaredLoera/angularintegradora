import { Injectable } from '@angular/core';
import { User } from './models/user.interface';
import { HttpClient } from '@angular/common/http';
import { ip } from './global';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = ip;

  constructor(private http: HttpClient) { }

  createUser(user: User) {
    const url = `${this.apiUrl}/usuarioA`;
    return this.http.post(url, user);
  }

  
}
