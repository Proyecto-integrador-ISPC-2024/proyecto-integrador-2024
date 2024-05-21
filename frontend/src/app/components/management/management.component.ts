import { Component } from '@angular/core';
import { ProductManagementComponent } from '../product-management/product-management.component';
import { OrderManagementComponent } from '../order-management/order-management.component';

@Component({
  selector: 'app-management',
  standalone: true,
  imports: [ProductManagementComponent, OrderManagementComponent],
  templateUrl: './management.component.html',
  styleUrl: './management.component.css',
})
export class ManagementComponent {}
