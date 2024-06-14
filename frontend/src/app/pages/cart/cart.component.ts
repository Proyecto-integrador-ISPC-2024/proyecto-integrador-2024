import { Component, OnInit } from '@angular/core';
import { PaymentsComponent } from '../../components/payments/payments.component';
import { CartResumeComponent } from '../../components/cart-resume/cart-resume.component';
import { CartListComponent } from '../../components/cart-list/cart-list.component';
import { Product } from '../../../interfaces/product';
import { CartService } from '../../../services/cart.service';
import { ApiService } from '../../../services/api.service';
import { PaymentMethodData } from '../../../interfaces/paymentMethodData';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [PaymentsComponent, CartResumeComponent, CartListComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  paymentMethods: PaymentMethodData = {
    formas_de_pago: [],
    tarjetas: [],
  };
  private urlPaymentMethods: string =
    'http://localhost:8000/pedidos/listar_metodopago/'; /* When making a GET request to this URL, the error triggers */

  constructor(
    private cartService: CartService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe((cartItems) => {
      this.cartItems = cartItems;
    });
    this.getPaymentMethods();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.productos.precio * item.cantidad,
      0
    );
  }

  handleCartUpdate(updatedCartItems: Product[]): void {
    this.cartService.setCartItems(updatedCartItems);
  }

  removeProduct(product: Product): void {
    this.cartService.removeFromCart(product);
  }

  updateProductQuantity(product: Product, quantity: number): void {
    const existingProduct = this.cartItems.find(
      (item) => item.id_producto_talle === product.id_producto_talle
    );

    if (existingProduct) {
      const difference = quantity - existingProduct.cantidad;
      this.cartService.updateStock(existingProduct, -difference);
      existingProduct.cantidad = quantity;
      this.cartService.setCartItems([...this.cartItems]);
    }
  }

  getPaymentMethods(): void {
    this.apiService
      .getWithAuth<PaymentMethodData>(this.urlPaymentMethods)
      .subscribe({
        next: (methods) => {
          this.paymentMethods = methods;
          console.log(this.paymentMethods);
        },
        error: (error) => {
          console.error('Error fetching payment methods:', error);
          alert(
            'Error al obtener los métodos de pago: ' +
              (error.error.message || 'Ocurrió un error')
          );
        },
      });
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartService.setCartItems(this.cartItems);
  }
}
