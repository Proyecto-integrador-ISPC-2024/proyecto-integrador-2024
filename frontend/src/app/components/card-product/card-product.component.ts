import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../interfaces/product';
import { CommonModule, NgIf } from '@angular/common';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-card-product',
  templateUrl: './card-product.component.html',
  styleUrls: ['./card-product.component.css'],
  imports: [NgIf, CommonModule],
  standalone: true,
})
export class CardProductComponent {
  constructor(private cartService: CartService) {}

  @Input() product: Product = {
    id_producto_talle: 0,
    productos: {
      id_producto: 0,
      imagen: '',
      nombre_producto: '',
      precio: 0,
    },
    talles: {
      talles: [],
      stock: [],
    },
    cantidad: 1,
    talleSeleccionado: '',
    stockSeleccionado: 0,
  };

  @Output() addToCart: EventEmitter<Product> = new EventEmitter<Product>();

  selectedSize: string = '';
  selectedStock: number = 0;

  selectSize(size: string, index: number): void {
    this.selectedSize = size;
    this.selectedStock = this.product.talles.stock[index];
    this.product.talleSeleccionado = size;
    this.product.stockSeleccionado = this.product.talles.stock[index];
  }

  addProductToCart(): void {
    if (this.selectedSize === '' || this.selectedStock === 0) {
      alert('Por favor, primero elegí un talle.');
      return;
    }

    const productToCart = {
      ...this.product,
      talleSeleccionado: this.selectedSize,
      stockSeleccionado: this.selectedStock,
      cantidad: 1,
    };

    console.log('Buying:', productToCart);
    this.addToCart.emit(productToCart);
  }

  isInCart(): boolean {
    return this.cartService.isProductInCart(
      this.product.productos.id_producto,
      this.selectedSize
    );
  }
}
