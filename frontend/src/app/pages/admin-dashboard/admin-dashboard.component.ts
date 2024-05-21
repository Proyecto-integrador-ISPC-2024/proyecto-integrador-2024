import { Component } from '@angular/core';
import { OrdersSummaryComponent } from '../../components/orders-summary/orders-summary.component';
import { ManagementComponent } from '../../components/management/management.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [ManagementComponent, OrdersSummaryComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

}
