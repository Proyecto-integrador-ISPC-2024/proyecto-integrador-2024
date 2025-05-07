/* import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../interfaces/user';
import { map, tap } from 'rxjs/operators';
import { Token } from '@angular/compiler';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private url = "http://127.0.0.1:8000";
  // URL base de tu backend Django

  constructor(private http: HttpClient) { }

  createUser(user: User): Observable<any> {
    return this.http.post(`${this.url}/usuarios/`, user);
  }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(`${this.url}/login/`, credentials).pipe(
      // tap(response => {
      //   if (response && response.access) {
      //     localStorage.setItem('token', response.access);
      //   }
      // })
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
    // Elimina el token del almacenamiento local.
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    // Obtiene el token del almacenamiento local.
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    // Verificamos si el usuario está autenticado comprobando la presencia del token.
    return !!this.getToken();
  }
} */


/* ----------------------------------------- */

  import { Injectable } from '@angular/core';
  import { HttpClient, HttpHandler, HttpRequest } from '@angular/common/http';
  import { BehaviorSubject, Observable, throwError } from 'rxjs';
  import { User } from '../interfaces/user';
  import { catchError, filter, map, switchMap, take, tap } from 'rxjs/operators';
  // import { Token } from '@angular/compiler';

  @Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    private url = 'http://127.0.0.1:8000';
    private refreshTokenInProgress = false;
    private refreshTokenSubject: BehaviorSubject<any> =
      new BehaviorSubject<any>(null);

    constructor(private http: HttpClient) {}

    createUser(user: User): Observable<any> {
      return this.http.post(`${this.url}/usuarios/`, user);
    }

    login(credentials: { email: string; password: string }): Observable<any> {
      return this.http.post<any>(`${this.url}/login/`, credentials).pipe(
        map((response) => {
          // console.log('Respuesta del servidor:', response);
          if (response && response.token) {
            localStorage.setItem('access_token', response.token);
            localStorage.setItem('refresh_token', response.refresh_token);
            localStorage.setItem(
              'currentUser',
              JSON.stringify(response.usuario)
            );
          }
          return response;
        })
      );
    }

    logout() {
      // Elimina el token del almacenamiento local.
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('currentUser');
    }

    getToken(): string | null {
      // Obtiene el token del almacenamiento local.
      return localStorage.getItem('access_token');
    }

    getRefreshToken(): string | null {
      return localStorage.getItem('refresh_token');
    }

    refreshToken(): Observable<any> {
      const refreshToken = this.getRefreshToken();
      return this.http
        .post<any>(`${this.url}/api/token/refresh/`, { refresh: refreshToken })
        .pipe(
          tap((response) => {
            if (response && response.access) {
              localStorage.setItem('access_token', response.access); /* Fix here */
            }
          })
        );
    }

    isLoggedIn(): boolean {
      // Verificamos si el usuario está autenticado comprobando la presencia del token.
      return !!this.getToken();
    }

    handle401Error(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<any> {
      if (!this.refreshTokenInProgress) {
        this.refreshTokenInProgress = true;
        this.refreshTokenSubject.next(null);

        return this.refreshToken().pipe(
          switchMap((token: any) => {
            this.refreshTokenInProgress = false;
            this.refreshTokenSubject.next(token.access);
            return next.handle(this.addToken(request, token.access));
          }),
          catchError((err) => {
            this.refreshTokenInProgress = false;
            this.logout();
            return throwError(() => err);
          })
        );
      } else {
        return this.refreshTokenSubject.pipe(
          filter((token) => token != null),
          take(1),
          switchMap((token) => {
            return next.handle(this.addToken(request, token));
          })
        );
      }
    }

    private addToken(request: HttpRequest<any>, token: string) {
      return request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  }
