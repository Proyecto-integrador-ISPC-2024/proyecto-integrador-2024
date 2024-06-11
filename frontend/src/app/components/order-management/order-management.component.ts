import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardOrder } from '../../../interfaces/order';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-management.component.html',
  styleUrls: ['./order-management.component.css']
})


export class OrderManagementComponent {
  @Input() orders: DashboardOrder[] = [];
  @Output() cancelOrder = new EventEmitter<number>();
  @Output() searchOrderById = new EventEmitter<number>();
  
  showOrderHistory: boolean = false;
  tabs = [
    { title: 'Resumen de pedidos', isHistory: false, active: true },
    { title: 'Historial de pedidos', isHistory: true, active: false }
  ];

  get filteredOrders(): DashboardOrder[] {
    const activeTab = this.tabs.find(tab => tab.active);
    let filtered: DashboardOrder[];
    if (activeTab && activeTab.isHistory) {
      filtered = this.orders;
    } else {
      filtered = this.orders.filter(order => order.estado !== 'CANCELADO');
    }
    const sortedOrders = filtered.sort((a, b) => {
      if (a.estado === 'CANCELADO' && b.estado !== 'CANCELADO') return 1;
      if (a.estado !== 'CANCELADO' && b.estado === 'CANCELADO') return -1;
      return 0;
    });
  
    return sortedOrders;
  }

  onSearch(id_pedido: string) {
    const orderId = Number(id_pedido);
    if (!isNaN(orderId)) {
      this.searchOrderById.emit(orderId);
    }
  }
  
  onCancelOrder(id_pedido: number) {
    this.cancelOrder.emit(id_pedido);
  }

  toggleOrderHistory(isHistory: boolean) {
    this.showOrderHistory = isHistory;
    this.tabs = this.tabs.map(tab => ({
      ...tab,
      active: tab.isHistory === isHistory
    })).sort((a, b) => b.active ? 1 : -1);
  }
  
  formatFormasDePago(forma_de_pago: { forma_de_pago_descripcion: string }[]): string {
    if (!forma_de_pago) return '';
    return forma_de_pago.map(fp => fp.forma_de_pago_descripcion).join(', ');
  }
  
}
