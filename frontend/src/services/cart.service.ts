import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../interfaces/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: Product[] = [];
  private cartItemsSubject = new BehaviorSubject<Product[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(product: Product): void {
    const existingProduct = this.cartItems.find(
      (item) => item.id_producto_talle === product.id_producto_talle
    );

    if (!existingProduct) {
      this.cartItems.push(product);
      this.updateStock(product, -product.cantidad);
      this.cartItemsSubject.next(this.cartItems);
    } else {
      existingProduct.cantidad += product.cantidad;
      this.updateStock(existingProduct, -product.cantidad);
      this.cartItemsSubject.next(this.cartItems);
    }
  }

  removeFromCart(product: Product): void {
    const currentItems = this.cartItemsSubject.getValue();
    const updatedItems = currentItems.filter(
      (item) => item.id_producto_talle !== product.id_producto_talle
    );
    this.setCartItems(updatedItems);
  }

  updateStock(product: Product, quantity: number): void {
    const productIndex = this.cartItems.findIndex(
      (item) => item.id_producto_talle === product.id_producto_talle
    );

    if (productIndex !== -1) {
      const stockIndex = product.talles.talles.indexOf(product.talleSeleccionado);
      if (stockIndex !== -1) {
        product.talles.stock[stockIndex] += quantity;
      }
    }
  }

  isProductInCart(productId: number, size: string): boolean {
    return this.cartItems.some(
      (item) => item.productos.id_producto === productId && item.talleSeleccionado === size
    );
  }

  getCartItems(): Product[] {
    return this.cartItems;
  }

  setCartItems(cartItems: Product[]): void {
    this.cartItems = cartItems;
    this.cartItemsSubject.next(this.cartItems);
  }
}
