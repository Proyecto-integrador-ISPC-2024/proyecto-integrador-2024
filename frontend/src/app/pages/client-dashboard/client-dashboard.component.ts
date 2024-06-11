import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersSummaryComponent } from '../../components/orders-summary/orders-summary.component';
import { ProductsSuggestComponent } from '../../components/products-suggest/products-suggest.component';
import { OrderManagementComponent } from '../../components/order-management/order-management.component';
import { OrdersService } from '../../../services/orders.service';
import { DashboardOrder } from '../../../interfaces/order';
import { catchError, of, switchMap, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [CommonModule, OrderManagementComponent, OrdersSummaryComponent, ProductsSuggestComponent],
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})


export class ClientDashboardComponent implements OnInit {
  orders: DashboardOrder[] = [];
  filteredOrders: DashboardOrder[] = [];
  selectedOrder: DashboardOrder | null = null;
  id_usuario: number;

  constructor(private ordersService: OrdersService) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (currentUser && currentUser.id) {
      this.id_usuario = parseInt(currentUser.id, 10);
    } else {
      this.id_usuario = NaN;
    }
  }
  
  ngOnInit() {
    this.loadOrders().subscribe({
      next: () => {
      },
      error: (error) => console.error('Error loading orders:', error)
    });
  }
  
  loadOrders(): Observable<DashboardOrder[]> {
    return this.ordersService.getAllOrders().pipe(
      catchError(error => {
        console.error('Error loading orders:', error);
        return of([]);
      }),
      tap((orders: DashboardOrder[]) => {
        this.orders = orders.filter(order => order.id_usuario === this.id_usuario);
        this.filteredOrders = [...this.orders];
      })
    );
  }  
  
  searchOrderById(id: number) {
    if (id) {
      const order = this.orders.find(order => order.id_pedido === id);
      if (order) {
        this.filteredOrders = [order];
      } else {
        this.ordersService.getOrder(id).subscribe({
          next: (order) => {
            if (order && order.id_usuario === this.id_usuario) {
              this.filteredOrders = [order];
            }
          },
          error: (error) => {
            console.error(`Error searching order by ID ${id}:`, error);
          }
        });
      }
    } else {
      this.filteredOrders = [...this.orders];
    }
  }
  
  selectOrder(id: number) {
    const order = this.orders.find(order => order.id_pedido === id);
    if (order) {
      this.selectedOrder = order;
      this.filteredOrders = [order, ...this.orders.filter(o => o.id_pedido !== order.id_pedido && o.id_usuario === this.id_usuario)];
    }
  }
  
  toggleOrderHistory(isHistory: boolean) {
    this.filteredOrders = isHistory
      ? this.orders
      : this.orders.filter(order => order.estado !== 'CANCELADO');
  }
  
  onCancelOrder(id_pedido: number): void {
    this.ordersService.cancelOrder(id_pedido).subscribe({
      next: () => {
        this.loadOrders().subscribe({
          next: (orders) => {
          },
          error: (error) => {
          }
        });
      },
      error: (error) => {
      }
    });
  }
}
