import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pedido, EstadoPedido } from '../interfaces/order';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private baseUrl = 'https://6656d1989f970b3b36c6a331.mockapi.io/pedidos';

  constructor(private http: HttpClient) {}

  private transformOrder(order: any): Pedido {
    return {
      ...order,
      status: order.status as EstadoPedido
    };
  }

  getAllOrders(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(this.baseUrl).pipe(
      map(orders => orders.map(order => this.transformOrder(order)))
    );
  }

  getOrder(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${this.baseUrl}/${id}`).pipe(
      map(order => this.transformOrder(order))
    );
  }

  cancelOrder(id: number, order: Pedido): Observable<Pedido> {
    return this.http.put<Pedido>(`${this.baseUrl}/${id}`, order);
  }
}
