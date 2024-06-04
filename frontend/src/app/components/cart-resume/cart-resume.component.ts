import { Component, EventEmitter, inject, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../interfaces/product';
import { NgFor } from '@angular/common';
import { EstadoPedido, Order } from '../../../interfaces/order';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-cart-resume',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './cart-resume.component.html',
  styleUrl: './cart-resume.component.css',
})
export class CartResumeComponent implements OnChanges {
  private ordersUrl = 'https://6656d1989f970b3b36c6a331.mockapi.io/pedidos';
  @Input() cartResume: Product[] = [];
  @Input() totalPrice: number = 0;
  @Input() paymentMethods: string[] = [];
  @Output() clearCartEvent = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cartResume']) {
      this.calculateTotalPrice();
    }
  }

  private calculateTotalPrice(): void {
    this.totalPrice = this.cartResume.reduce(
      (sum, product) => sum + product.productos.precio * product.cantidad,
      0
    );
  }

  formBuilder = inject(FormBuilder);
  apiService = inject(ApiService);

  formGroup = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email], []],
    payment: ['', Validators.required],
    terms: ['', Validators.requiredTrue],
  });

  clickRegister(): void {
    const formValues = this.formGroup.value;
    if (this.formGroup.valid) {
      this.createOrder(formValues);
    }
  }

  createOrder(formValues: any): void {
    const userId = 1;
    const createdAt = new Date().toLocaleString();
    const order: Order = {
      id: 0,
      id_usuario: userId,
      fecha_creacion: createdAt,
      id_productos: this.cartResume.map(
        (product) => product.id_producto_talle!
      ),
      status: EstadoPedido.pending,
      amount: this.cartResume.map((product) => product.cantidad),
      subtotal: this.cartResume.map(
        (product) => product.productos.precio * product.cantidad
      ),
      precio_total: this.totalPrice,
      metodo_pago: formValues.payment,
    };

    this.apiService.post<Order>(this.ordersUrl, order).subscribe({
      next: (createdOrder) => {
        // console.log(createdOrder);
        alert('Order created successfully!');
        this.clearCart();
      },
      error: (error) => {
        console.error('Error creating order:', error);
        alert('Failed to create order.');
      },
    });
  }

  clearCart(): void {
    this.cartResume = [];
    this.clearCartEvent.emit();
  }

  onEnviar(event: Event) {
    event.preventDefault();
    if (this.formGroup.valid) {
      this.clickRegister();
    } else {
      this.formGroup.markAllAsTouched();
      alert('Por favor, complete todos los campos.');
    }
  }
}

