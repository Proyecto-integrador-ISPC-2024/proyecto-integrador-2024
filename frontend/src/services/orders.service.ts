import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Order } from '../interfaces/order';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private apiService: ApiService) {}

  // Get/Read
  getOrder = (url: string): Observable<Order> => {
    return this.apiService.get(url);
  };

  // Create
  addOrder = (url: string, body: Order): Observable<Order> => {
    return this.apiService.post(url, body, {});
  };

  // Update
  editOrder = (url: string, body: Order): Observable<Order> => {
    return this.apiService.put(url, body, {});
  };

  // Delete
  deleteOrder = (url: string): Observable<Order> => {
    return this.apiService.delete(url, {});
  };
}

