import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItemComponent } from '../cart-item/cart-item.component';
import { Product } from '../../../interfaces/product';
import { NgForOf, NgIf } from '@angular/common';

@Component({
  selector: 'app-cart-list',
  standalone: true,
  imports: [CartItemComponent, NgForOf, NgIf],
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css'],
})
export class CartListComponent {
  @Input() cartList: Product[] = [];
  @Output() cartUpdated: EventEmitter<Product[]> = new EventEmitter<
    Product[]
  >();

  handleRemoveProduct(product: Product): void {
    this.cartList = this.cartList.filter(
      (item) => item.id_producto_talle !== product.id_producto_talle
    );
    this.cartUpdated.emit(this.cartList);
  }

  handleUpdateQuantity(update: { product: Product; quantity: number }): void {
    const updatedCartList = this.cartList.map((item) =>
      item.id_producto_talle === update.product.id_producto_talle
        ? { ...item, cantidad: update.quantity }
        : item
    );
    this.cartUpdated.emit(updatedCartList);
  }
}
