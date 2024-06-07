import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Product } from '../../../interfaces/product';
import { CartOrder } from '../../../interfaces/cartOrder';
import { PaymentMethodData } from '../../../interfaces/paymentMethodData';

@Component({
  selector: 'app-cart-resume',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgSwitch, NgSwitchCase, NgIf],
  templateUrl: './cart-resume.component.html',
  styleUrl: './cart-resume.component.css',
})
export class CartResumeComponent implements OnChanges {
  private ordersUrl = 'http://localhost:8000/pedidos/';
  // private ordersUrl = 'https://664d5d12ede9a2b556534efe.mockapi.io/products';
  @Input() cartResume: Product[] = [];
  @Input() totalPrice: number = 0;
  @Input() paymentMethods: PaymentMethodData = {
    formas_de_pago: [],
    tarjetas: [],
  };
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
    email: ['', [Validators.required, Validators.email]],
    payment: ['', Validators.required],
    terms: [false, Validators.requiredTrue],

    // Additional fields for different payment methods
    /* bankName: [''],
    paymentLocation: [''],
    cardNumber: [''],
    cardExpiry: [''],
    cardCVV: [''], */
  });

  selectedPaymentMethod: number | null = null;

  onPaymentChange(event: Event): void {
    const selectedPayment = (event.target as HTMLSelectElement).value;
    this.selectedPaymentMethod = parseInt(selectedPayment, 10);
    console.log('Selected Payment Method:', this.selectedPaymentMethod);
    // this.updateFormValidators();
  }

  /* private updateFormValidators(): void {
    this.formGroup.get('bankName')?.clearValidators();
    this.formGroup.get('paymentLocation')?.clearValidators();
    this.formGroup.get('cardNumber')?.clearValidators();
    this.formGroup.get('cardExpiry')?.clearValidators();
    this.formGroup.get('cardCVV')?.clearValidators();

    if (this.selectedPaymentMethod === 'transferencia') {
      this.formGroup.get('bankName')?.setValidators([Validators.required]);
    } else if (this.selectedPaymentMethod === 'efectivo') {
      this.formGroup
        .get('paymentLocation')
        ?.setValidators([Validators.required]);
    } else if (this.selectedPaymentMethod === 'credito') {
      this.formGroup
        .get('cardNumber')
        ?.setValidators([Validators.required, Validators.pattern(/^\d{16}$/)]);
      this.formGroup
        .get('cardExpiry')
        ?.setValidators([
          Validators.required,
          Validators.pattern(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/),
        ]);
      this.formGroup
        .get('cardCVV')
        ?.setValidators([Validators.required, Validators.pattern(/^\d{3,4}$/)]);
    }
    this.formGroup.get('bankName')?.updateValueAndValidity();
    this.formGroup.get('paymentLocation')?.updateValueAndValidity();
    this.formGroup.get('cardNumber')?.updateValueAndValidity();
    this.formGroup.get('cardExpiry')?.updateValueAndValidity();
    this.formGroup.get('cardCVV')?.updateValueAndValidity();
  } */

  clickRegister(): void {
    const formValues = this.formGroup.value;
    if (this.formGroup.valid) {
      this.createOrder(formValues);
    }
  }

  createOrder(formValues: any): void {
    const userId = 1; // This should be dynamically set based on logged in user
    const paymentMethod = this.paymentMethods.formas_de_pago.find(
      (pm) => pm.id_forma_de_pago === this.selectedPaymentMethod
    );

    if (!paymentMethod) {
      console.error('Selected payment method is invalid');
      return;
    }

    const order: CartOrder = {
      id_usuario: userId,
      total: this.totalPrice,
      detalles: this.cartResume.map((product) => ({
        id_talle: product.id_talleSeleccionado,
        id_producto: product.productos.id_producto,
        cantidad: product.cantidad,
        subtotal: product.productos.precio * product.cantidad,
      })),
      forma_de_pago: [
        {
          id_forma_de_pago: paymentMethod.id_forma_de_pago,
          id_tarjeta:
            this.selectedPaymentMethod ===
            this.paymentMethods.formas_de_pago.find(
              (pm) => pm.descripcion === 'Tarjeta de crédito'
            )?.id_forma_de_pago
              ? this.paymentMethods.tarjetas?.find((card) => card.id_tarjeta)
                  ?.id_tarjeta
              : null,
        },
      ],
    };

    this.apiService.post<CartOrder>(this.ordersUrl, order).subscribe({
      next: (createdOrder) => {
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
