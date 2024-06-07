import { Component, OnInit } from '@angular/core';
import { PaymentsComponent } from '../../components/payments/payments.component';
import { CartResumeComponent } from '../../components/cart-resume/cart-resume.component';
import { CartListComponent } from '../../components/cart-list/cart-list.component';
import { Product } from '../../../interfaces/product';
import { CartService } from '../../../services/cart.service';
import { ApiService } from '../../../services/api.service';
import { PaymentMethodData } from '../../../interfaces/paymentMethodData';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [PaymentsComponent, CartResumeComponent, CartListComponent],
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
    'http://localhost:8000/pedidos/listar_metodopago/';

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
      .get<PaymentMethodData>(this.urlPaymentMethods)
      .subscribe((methods) => {
        this.paymentMethods = methods;
        // console.log(this.paymentMethods);
      });
  }

  clearCart(): void {
    this.cartItems = [];
    this.cartService.setCartItems(this.cartItems);
  }
}
