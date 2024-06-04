import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
})
export class CartItemComponent implements OnInit {
  @Input() product!: Product;

  @Output() removeProduct: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() updateQuantity: EventEmitter<{
    product: Product;
    quantity: number;
  }> = new EventEmitter<{ product: Product; quantity: number }>();

  increaseAmount(): void {
    if (this.product.cantidad < this.product.stockSeleccionado) {
      this.product.cantidad++;
      this.updateQuantity.emit({
        product: this.product,
        quantity: this.product.cantidad,
      });
    }
  }

  decreaseAmount(): void {
    if (this.product.cantidad > 1) {
      this.product.cantidad--;
      this.updateQuantity.emit({
        product: this.product,
        quantity: this.product.cantidad,
      });
    }
  }

  deleteProduct(): void {
    this.removeProduct.emit(this.product);
  }

  ngOnInit(): void {}
}
