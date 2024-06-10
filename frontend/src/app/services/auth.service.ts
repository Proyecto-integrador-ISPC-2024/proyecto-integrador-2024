import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = "http://127.0.0.1:8000"; // URL base de tu backend Django

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<any> {
    return this.http.post(this.url, user);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.url}/api/token/`, credentials);
  }


  logout() {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local.
  }

  getToken(): string | null {
    return localStorage.getItem('token'); // Obtiene el token del almacenamiento local.
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Verificamos si el usuario está autenticado comprobando la presencia del token.
  }
}
