import { Component } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CartItemComponent],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent {

}
