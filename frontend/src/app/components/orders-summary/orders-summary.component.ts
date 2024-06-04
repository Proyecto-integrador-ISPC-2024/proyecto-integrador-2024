import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pedido, EstadoPedido } from '../../../interfaces/order';

@Component({
  selector: 'app-orders-summary',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders-summary.component.html',
  styleUrls: ['./orders-summary.component.css']
})
export class OrdersSummaryComponent {
  @Input() orders: Pedido[] = [];
  @Output() orderSelected = new EventEmitter<number>();

  get nonCancelledOrders(): Pedido[] {
    return this.orders.filter(order => order.status !== EstadoPedido.Cancelled);
  }

  selectOrder(id: number) {
    this.orderSelected.emit(id);
  }
}
