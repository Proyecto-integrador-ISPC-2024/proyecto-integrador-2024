import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { User } from '../interfaces/user';
import { CartOrder } from '../interfaces/cartOrder';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}

  // Get
  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url) as Observable<T>;
  }

  getWithAuth<T>(url: string): Observable<T> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.get<T>(url, { headers }) as Observable<T>;
  }

  // Post
  postWithAuth<T>(
    url: string,
    body: Product | User | CartOrder
  ): Observable<T> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.post<T>(url, body, { headers }) as Observable<T>;
  }

  // Put
  putWithAuth<T>(url: string, body: Product | User | CartOrder): Observable<T> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.httpClient.put<T>(url, body, { headers }) as Observable<T>;
  }

  // Delete
  delete<T>(url: string): Observable<T> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    })
    return this.httpClient.delete<T>(url, { headers }) as Observable<T>;
  }
}

