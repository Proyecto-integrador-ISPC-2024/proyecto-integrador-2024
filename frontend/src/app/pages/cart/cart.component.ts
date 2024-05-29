import { Component } from '@angular/core';
import { PaymentsComponent } from '../../components/payments/payments.component';
import { CartResumeComponent } from '../../components/cart-resume/cart-resume.component';
import { CartListComponent } from '../../components/cart-list/cart-list.component';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [PaymentsComponent, CartResumeComponent, CartListComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {

  cartItems: Product[] = [
    {
      id: 0,
      name: 'Camiseta futbol S',
      price: 120,
      amount: 2,
      image: 'https://loremflickr.com/640/480/nature',
      size: '',
      stock: 10,
      variant: '',
    },
    {
      id: 1,
      name: 'Camiseta futbol M',
      price: 160,
      amount: 4,
      image: 'https://loremflickr.com/640/480/nature',
      size: '',
      stock: 10,
      variant: '',
    },
    {
      id: 2,
      name: 'Camiseta futbol L',
      price: 320,
      amount: 1,
      image: 'https://loremflickr.com/640/480/nature',
      size: '',
      stock: 10,
      variant: '',
    },
    {
      id: 3,
      name: 'Camiseta futbol XL',
      price: 150,
      amount: 3,
      image: 'https://loremflickr.com/640/480/nature',
      size: '',
      stock: 10,
      variant: '',
    },
    {
      id: 4,
      name: 'Camiseta futbol XXL',
      price: 200,
      amount: 2,
      image: 'https://loremflickr.com/640/480/nature',
      size: '',
      stock: 10,
      variant: '',
    },
  ];

}
