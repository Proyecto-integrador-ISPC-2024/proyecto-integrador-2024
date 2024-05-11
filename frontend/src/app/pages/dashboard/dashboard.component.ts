import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ProductsSummaryComponent } from '../../components/products-summary/products-summary.component';
import { OrdersSummaryComponent } from '../../components/orders-summary/orders-summary.component';
import { ProductsSuggestComponent } from '../../components/products-suggest/products-suggest.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ProductsSummaryComponent, OrdersSummaryComponent, ProductsSuggestComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
