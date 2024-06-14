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
    talles: [],
    talleSeleccionado: '',
    id_talleSeleccionado: 0,
    cantidad: 1,
    stockSeleccionado: 0,
  };

  @Output() addToCart: EventEmitter<Product> = new EventEmitter<Product>();

  selectedSize: string = ''
  selectedSize_id: number = 0;
  selectedStock: number = 0;

  selectSize(size_id: number, stock: number, size: string): void {
    this.selectedSize_id = size_id;
    this.product.id_talleSeleccionado = size_id;
    this.selectedSize = size;
    this.product.talleSeleccionado = size;
    this.selectedStock = stock;
    this.product.stockSeleccionado = stock;
  }

  addProductToCart(): void {
    if (this.selectedSize_id === 0 || this.selectedStock === 0 || this.selectedSize === '') {
      alert('Por favor, primero elegí un talle.');
      return;
    }

    const productToCart = {
      ...this.product,
      talleSeleccionado: this.selectedSize,
      id_talleSeleccionado: this.selectedSize_id,
      stockSeleccionado: this.selectedStock,
      cantidad: 1,
    };

    // console.log(productToCart);
    this.addToCart.emit(productToCart);
  }

  isInCart(): boolean {
    return this.cartService.isProductInCart(
      this.product.productos.id_producto,
      this.selectedSize_id
    );
  }
}
