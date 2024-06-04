import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order, EstadoPedido } from '../../../interfaces/order';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})
export class OrderManagementComponent {
  @Input() orders: Order[] = [];
  @Output() cancelOrder = new EventEmitter<number>();
  @Output() searchOrderById = new EventEmitter<number>();

  showOrderHistory: boolean = false;
  tabs = [
    { title: 'Resumen de pedidos', isHistory: false, active: true },
    { title: 'Historial de pedidos', isHistory: true, active: false }
  ];

  get filteredOrders(): Order[] {
    return this.showOrderHistory ? this.orders : this.nonCancelledOrders;
  }

  get nonCancelledOrders(): Order[] {
    return this.orders.filter(order => order.status === EstadoPedido.pending || order.status === EstadoPedido.Accepted);
  }

  get cancelledOrders(): Order[] {
    return this.orders.filter(order => order.status === EstadoPedido.Cancelled);
  }

  onSearch(id: string) {
    const orderId = Number(id);
    if (!isNaN(orderId)) {
      this.searchOrderById.emit(orderId);
    } else {
      console.error('Invalid order ID');
    }
  }

  onCancelOrder(id: number) {
    this.cancelOrder.emit(id);
  }

  toggleOrderHistory(isHistory: boolean) {
    this.showOrderHistory = isHistory;
    this.tabs = this.tabs.map(tab => ({
      ...tab,
      active: tab.isHistory === isHistory
    })).sort((a, b) => b.active ? 1 : -1);
  }
}
