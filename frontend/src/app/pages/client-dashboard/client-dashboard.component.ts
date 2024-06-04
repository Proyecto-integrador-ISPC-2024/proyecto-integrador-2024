import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersSummaryComponent } from '../../components/orders-summary/orders-summary.component';
import { ProductsSuggestComponent } from '../../components/products-suggest/products-suggest.component';
import { OrderManagementComponent } from '../../components/order-management/order-management.component';
import { OrdersService } from '../../../services/orders.service';
import { Order, EstadoPedido } from '../../../interfaces/order';
import { catchError, of, switchMap, Observable } from 'rxjs';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule, OrderManagementComponent, OrdersSummaryComponent, ProductsSuggestComponent],
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  selectedOrder: Order | null = null;
  userId: number;

  constructor(private ordersService: OrdersService) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    this.userId = parseInt(currentUser.id, 10);
  }

  ngOnInit() {
    this.loadOrders().subscribe();
  }

  loadOrders(): Observable<Order[]> {
    return this.ordersService.getAllOrders().pipe(
      catchError(error => {
        console.error('Error loading orders:', error);
        return of([]);
      }),
      switchMap((data: Order[]) => {
        this.orders = data.filter(order => order.id_usuario === this.userId);
        this.filteredOrders = this.orders;
        return of(this.filteredOrders);
      })
    );
  }

  cancelOrder(id: number) {
    const orderToCancel = this.orders.find(order => order.id === id);
    if (orderToCancel) {
      this.ordersService.cancelOrder(id, { ...orderToCancel, status: EstadoPedido.Cancelled }).subscribe({
        next: () => {
          console.log(`Order ${id} cancelled`);
          this.loadOrders().subscribe();
        },
        error: (error) => {
          console.error(`Error cancelling order ${id}:`, error);
        }
      });
    } else {
      console.warn(`Order with ID ${id} not found`);
    }
  }

  searchOrderById(id: number) {
    if (id) {
      const order = this.orders.find(order => order.id === id);
      if (order) {
        this.filteredOrders = [order];
      } else {
        this.ordersService.getOrder(id).subscribe({
          next: (order) => {
            if (order && order.id_usuario === this.userId) {
              this.filteredOrders = [order];
            }
          },
          error: (error) => {
            console.error(`Error searching order by ID ${id}:`, error);
          }
        });
      }
    } else {
      this.filteredOrders = this.orders.filter(order => order.id_usuario === this.userId);
    }
  }

  selectOrder(id: number) {
    const order = this.orders.find(order => order.id === id);
    if (order) {
      this.selectedOrder = order;
      this.filteredOrders = [order, ...this.orders.filter(o => o.id !== order.id && o.id_usuario === this.userId)];
      this.toggleOrderHistory(false);
    }
  }

  toggleOrderHistory(isHistory: boolean) {
    this.filteredOrders = isHistory 
      ? this.orders 
      : this.orders.filter(order => order.status === EstadoPedido.Pending || order.status === EstadoPedido.Accepted);
  }
}
