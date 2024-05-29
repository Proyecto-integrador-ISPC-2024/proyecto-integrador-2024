import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = "https://66525119813d78e6d6d53814.mockapi.io/users";
  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<any> {
    return this.http.post(this.url, user);
  }
  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${this.url}/authenticate`, loginData);
  }
}
