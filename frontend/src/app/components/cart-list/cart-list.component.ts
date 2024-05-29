import { Component, Input, OnInit } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { Product } from '../../../interfaces/product';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CartItemComponent, NgForOf],
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent {
  @Input() cartList: Product[] = []; // Here I am supposed to receive products added by client


}
