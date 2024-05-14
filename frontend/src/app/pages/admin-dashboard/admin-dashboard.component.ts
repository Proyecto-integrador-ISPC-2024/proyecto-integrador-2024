import { Component } from '@angular/core';
import { ProductsSummaryComponent } from '../../components/products-summary/products-summary.component';
import { OrdersSummaryComponent } from '../../components/orders-summary/orders-summary.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [ProductsSummaryComponent, OrdersSummaryComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
