import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  token = 'fewuibfgesjkghs'; // tiene que estar vacio para poder encontrar el false para la ruta protegida
  url = "https://66525119813d78e6d6d53814.mockapi.io/users";
  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<any> {
    return this.http.post(this.url, user);
  }
  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${this.url}/authenticate`, loginData);
  }
  logout(): void {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem('token');
    // Limpiar la variable token en el servicio
    this.token = '';
  }
  isAuth(){
    return this.token.length > 0; // retorna false por el momento
  }

  // USAR getToken cuando tengamos la autenticación basada en jwt.
  getToken(): string | null {
    return localStorage.getItem('token'); // Obtiene el token del almacenamiento local.
  }

  // USAR isLoggedIn() en rutas protegidas.
  isLoggedIn(): boolean {
    return !!this.getToken(); // Verificamos si el usuario está autenticado comprobando la presencia del token.
  }
}
