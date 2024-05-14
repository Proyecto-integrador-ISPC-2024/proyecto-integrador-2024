import { Component } from '@angular/core';
import { PaymentsComponent } from '../../components/payments/payments.component';
import { CartResumeComponent } from '../../components/cart-resume/cart-resume.component';
import { CartListComponent } from '../../components/cart-list/cart-list.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [PaymentsComponent, CartResumeComponent, CartListComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {}
