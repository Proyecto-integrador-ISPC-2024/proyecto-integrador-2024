import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order, EstadoPedido } from '../interfaces/order';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  // private baseUrl = 'localhost:8000/pedidos';
  private baseUrl = 'https://6656d1989f970b3b36c6a331.mockapi.io/pedidos'; /* provisorio hasta correción de interfaz Order.ts */

  constructor(private http: HttpClient) {}

  private transformOrder(order: any): Order {
    return {
      ...order,
      status: order.status as EstadoPedido,
    };
  }

  getAllOrders(): Observable<Order[]> {
    return this.http
      .get<Order[]>(this.baseUrl)
      .pipe(map((orders) => orders.map((order) => this.transformOrder(order))));
  }

  getOrder(id: number): Observable<Order> {
    return this.http
      .get<Order>(`${this.baseUrl}/${id}`)
      .pipe(map((order) => this.transformOrder(order)));
  }

  cancelOrder(id: number, order: Order): Observable<Order> {
    return this.http.put<Order>(`${this.baseUrl}/${id}`, order);
  }
}
