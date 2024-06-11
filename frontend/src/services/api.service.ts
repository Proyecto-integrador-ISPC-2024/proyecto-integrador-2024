import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../interfaces/product';
import { User } from '../interfaces/user';
import { CartOrder } from '../interfaces/cartOrder';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  // Get
  get<T>(url: string): Observable<T> {
    return this.httpClient.get<T>(url) as Observable<T>;
  }

  // Post
  post<T>(
    url: string,
    body: Product | User | CartOrder
  ): Observable<T> {
    return this.httpClient.post<T>(url, body) as Observable<T>;
  }

  // Put
  put<T>(
    url: string,
    body: Product | User | CartOrder
  ): Observable<T> {
    return this.httpClient.put<T>(url, body) as Observable<T>;
  }

  // Delete
  delete<T>(url: string): Observable<T> {
    return this.httpClient.delete<T>(url) as Observable<T>;
  }
}

