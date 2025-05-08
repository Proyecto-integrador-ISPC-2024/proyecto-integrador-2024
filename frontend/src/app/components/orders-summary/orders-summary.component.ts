import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardOrder } from '../../interfaces/order';

@Component({
  selector: 'app-orders-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-summary.component.html',
  styleUrls: ['./orders-summary.component.css']
})
export class OrdersSummaryComponent {
  @Input() orders: DashboardOrder[] = [];
  @Output() selectedOrder = new EventEmitter<number>();

  get nonCancelledOrders(): DashboardOrder[] {
    return this.orders.filter(order => order.estado === 'ACEPTADO' || order.estado === 'ENVIADO');
  }

  selectOrder(id: number) {
    this.selectedOrder.emit(id);
  }
}
