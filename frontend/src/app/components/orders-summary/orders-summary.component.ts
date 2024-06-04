import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order, EstadoPedido } from '../../../interfaces/order';

@Component({
  selector: 'app-orders-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-summary.component.html',
  styleUrls: ['./orders-summary.component.css']
})
export class OrdersSummaryComponent {
  @Input() orders: Order[] = [];
  @Output() orderSelected = new EventEmitter<number>();

  get nonCancelledOrders(): Order[] {
    return this.orders.filter(order => order.status !== EstadoPedido.Cancelled);
  }

  selectOrder(id: number) {
    this.orderSelected.emit(id);
  }
}
