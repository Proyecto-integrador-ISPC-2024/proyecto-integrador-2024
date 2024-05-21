import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrdersSummaryComponent } from '../../components/orders-summary/orders-summary.component';
import { ProductsSuggestComponent } from '../../components/products-suggest/products-suggest.component';
import { RouterLink } from '@angular/router';
import { ManagementComponent } from '../../components/management/management.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ManagementComponent, OrdersSummaryComponent, ProductsSuggestComponent, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
