import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { map, tap } from 'rxjs/operators';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = "http://127.0.0.1:8000"; // URL base de tu backend Django

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<any> {
    return this.http.post(`${this.url}/usuarios/`, user);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.url}/login/`, credentials).pipe(
      /* tap(response => {
        if (response && response.access) {
          localStorage.setItem('token', response.access);
        }
      }) */
      map(response => {
        // Manejar la respuesta
        if (response && response['token']) {
          // Almacenar los tokens y el id del usuario en localStorage
          localStorage.setItem('access_token', response['token']);
          localStorage.setItem('refresh_token', response['refresh_token']);
          localStorage.setItem('currentUser', JSON.stringify(response['usuario']));
        }
        return response;
      })
    );
  }

  logout() {
    localStorage.removeItem('token'); // Elimina el token del almacenamiento local.
  }

  getToken(): string | null {
    return localStorage.getItem('access_token'); // Obtiene el token del almacenamiento local.
  }

  isLoggedIn(): boolean {
    return !!this.getToken(); // Verificamos si el usuario está autenticado comprobando la presencia del token.
  }
}
