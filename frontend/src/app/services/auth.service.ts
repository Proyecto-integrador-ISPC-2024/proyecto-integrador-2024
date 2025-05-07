
  import { Injectable } from '@angular/core';
  import { HttpClient, HttpRequest,HttpHandler,HttpEvent, } from '@angular/common/http';
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

    logout(): Observable<any> {
      const currentUser = this.getCurrentUser();
    
      if (!currentUser?.email) {
        this.clearLocalStorage();
        return throwError(() => new Error('Usuario no encontrado en localStorage'));
      }
    
      return this.http
        .post(`${this.url}/logout/`, { email: currentUser.email })
        .pipe(
          tap(() => this.clearLocalStorage()),
          catchError((error) => {
            this.clearLocalStorage();
            return throwError(() => error);
          })
        );
    }
    
    private clearLocalStorage(): void {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('currentUser');
    }
    
    getCurrentUser(): any {
      const user = localStorage.getItem('currentUser');
      return user ? JSON.parse(user) : null;
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
    ): Observable<HttpEvent<any>> {
      if (!this.refreshTokenInProgress) {
        this.refreshTokenInProgress = true;
        this.refreshTokenSubject.next(null);
    
        return this.refreshToken().pipe(
          switchMap((token) => {
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
          switchMap((token) => next.handle(this.addToken(request, token!)))
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
