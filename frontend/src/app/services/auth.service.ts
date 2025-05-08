
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
    private authStatus = new BehaviorSubject<boolean>(this.hasToken());
    public isAuthenticated$ = this.authStatus.asObservable();

    constructor(private http: HttpClient) {}

    createUser(user: User): Observable<any> {
      return this.http.post(`${this.url}/usuarios/`, user);
    }

    login(credentials: { email: string; password: string }): Observable<any> {
      return this.http.post<any>(`${this.url}/login/`, credentials).pipe(
        map((response) => {
          if (response?.token && response?.refresh_token) {
            localStorage.setItem('access_token', response.token);
            localStorage.setItem('refresh_token', response.refresh_token);
            localStorage.setItem(
              'currentUser',
              JSON.stringify(response.usuario));
              this.authStatus.next(true);
          }
          return response;
        })
      );
    }

    logout(): Observable<any> {
      const currentUser = this.getCurrentUser();
      const token = localStorage.getItem('access_token');
    
      if (!currentUser?.email || !token) {
        this.clearLocalStorage();
        this.authStatus.next(false);
        return throwError(() => new Error('Usuario o token no encontrado en localStorage'));
      }
    
      // Enviar el token en el encabezado Authorization
      const headers = {
        'Authorization': `Bearer ${token}`,
      };
    
      return this.http
      .post(`${this.url}/logout/`, { email: currentUser.email }, { headers })
      .pipe(
        tap(() => {
          this.clearLocalStorage();
          this.authStatus.next(false);
        }),
        catchError((error) => {
          this.clearLocalStorage();
          this.authStatus.next(false);
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

    private hasToken(): boolean {
      return !!this.getToken();
    }

    getRefreshToken(): string | null {
      return localStorage.getItem('refresh_token');
    }

    refreshToken(): Observable<string> {
      const refresh = this.getRefreshToken();
      return this.http
        .post<{ access: string }>(`${this.url}/api/token/refresh/`, { refresh })
        .pipe(
          map(res => {
            if (!res.access) throw new Error('No vino access token');
            localStorage.setItem('access_token', res.access);
            return res.access;
          }),
          catchError(err => {
            console.error('AuthService.refreshToken ERROR', err);
            this.clearLocalStorage();
            return throwError(() => err);
          })
        );
    }

    isLoggedIn(): boolean {
      return !!this.getToken();
    }

  }
