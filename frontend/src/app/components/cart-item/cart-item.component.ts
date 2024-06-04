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

  increaseAmount(): void {
    if (this.product.amount < this.product.stock[1]) {
      this.product.amount++;
    }
  }

  decreaseAmount(): void {
    if (this.product.amount > 1) {
      this.product.amount--;
    }
  }

  deleteProduct(): void {
    console.log(this.product);
    this.removeProduct.emit(this.product);
  }

  ngOnInit(): void {}
}
