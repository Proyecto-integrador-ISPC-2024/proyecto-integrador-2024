import { Component } from '@angular/core';
import { ProductsSummaryComponent } from '../../components/products-summary/products-summary.component';
import { OrdersSummaryComponent } from '../../components/orders-summary/orders-summary.component';
import { ProductsSuggestComponent } from '../../components/products-suggest/products-suggest.component';

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [ProductsSummaryComponent, OrdersSummaryComponent, ProductsSuggestComponent],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.css'
})
export class ClientDashboardComponent {

}
