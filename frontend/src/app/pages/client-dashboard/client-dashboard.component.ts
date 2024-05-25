import { Component } from '@angular/core';
import { OrdersSummaryComponent } from '../../components/orders-summary/orders-summary.component';
import { ProductsSuggestComponent } from '../../components/products-suggest/products-suggest.component';
import { OrderManagementComponent } from '../../components/order-management/order-management.component';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [OrderManagementComponent, OrdersSummaryComponent, ProductsSuggestComponent],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.css'
})
export class ClientDashboardComponent {




}
