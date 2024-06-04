import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() cartList: Product[] = [];
  @Output() cartUpdated: EventEmitter<Product[]> = new EventEmitter<Product[]>();

  handleRemoveProduct(product: Product): void {
    this.cartList = this.cartList.filter(item => item.id !== product.id);
    this.cartUpdated.emit(this.cartList);
  }
}
