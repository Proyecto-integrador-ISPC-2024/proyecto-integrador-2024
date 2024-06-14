import { AuthService } from './../app/services/auth.service';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ApiService } from './api.service';
import { DashboardOrder } from '../interfaces/order';
import { HttpHeaders, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private ordersUrl = 'http://127.0.0.1:8000/pedidos/';

  constructor(private apiService: ApiService, private authService: AuthService, private HttpClient: HttpClient) {} 

  getAllOrders<T>(): Observable<DashboardOrder[]> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.HttpClient.get<T>(this.ordersUrl, { headers }) as Observable<DashboardOrder[]>;
  }

  getOrder(id_pedido: number): Observable<DashboardOrder> {
    const url = `${this.ordersUrl}${id_pedido}/`;
    return this.apiService.getWithAuth<DashboardOrder>(url)
      .pipe(
        catchError(this.handleError<DashboardOrder>('getOrder'))
      );
  }

  cancelOrder(id_pedido: number): Observable<DashboardOrder> {
    const url = `${this.ordersUrl}${id_pedido}/`;
    return this.apiService.delete<DashboardOrder>(url).pipe(
      catchError(this.handleError<DashboardOrder>('cancelOrder'))
    );
  }
  
  private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
        return of(result as T);
      };
  }
}