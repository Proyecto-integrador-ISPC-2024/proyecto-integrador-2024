import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  Output,
  Renderer2,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { ApiService } from '../../../services/api.service';
import { Product } from '../../../interfaces/product';
import { CartOrder } from '../../../interfaces/cartOrder';
import { PaymentMethodData } from '../../../interfaces/paymentMethodData';
import { UserLocalStoraged } from '../../../interfaces/user';

@Component({
  selector: 'app-cart-resume',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgSwitch, NgSwitchCase, NgIf],
  templateUrl: './cart-resume.component.html',
  styleUrl: './cart-resume.component.css',
})
export class CartResumeComponent implements OnChanges {
  private ordersUrl = 'http://localhost:8000/pedidos/';
  @Input() cartResume: Product[] = [];
  @Input() totalPrice: number = 0;
  @Input() paymentMethods: PaymentMethodData = {
    formas_de_pago: [],
    tarjetas: [],
  };
  @Output() clearCartEvent = new EventEmitter<void>();
  @ViewChild('modalForm') modalForm!: ElementRef;

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
  renderer = inject(Renderer2);

  formGroup = this.formBuilder.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    payment: ['', Validators.required],
    creditCards: [''],
    terms: [false, Validators.requiredTrue],
  });

  selectedPaymentMethod: number | null = null;
  selectedCreditCard: number | null = null;

  onPaymentChange(event: Event): void {
    const selectedPayment = (event.target as HTMLSelectElement).value;
    this.selectedPaymentMethod = parseInt(selectedPayment, 10);

    const creditCardControl = this.formGroup.get('creditCards');

    if (this.selectedPaymentMethod === 3) {
      creditCardControl?.setValidators([Validators.required]);
    } else {
      creditCardControl?.clearValidators();
    }
    creditCardControl?.updateValueAndValidity();

    // console.log(this.selectedPaymentMethod);
  }

  onCardSelectChange(event: Event): void {
    const selectedCard = (event.target as HTMLSelectElement).value;
    this.selectedCreditCard = parseInt(selectedCard, 10);
    /* console.log(
      this.selectedCreditCard
    ); */
  }

  clickRegister(): void {
    const formValues = this.formGroup.value;
    if (this.formGroup.valid) {
      this.createOrder(formValues);
    }
  }

  getUserId(): number {
    const user = localStorage.getItem('currentUser');
    if (user) {
      const userData: UserLocalStoraged = JSON.parse(user);
      return userData.id_usuario;
    }
    return 0;
  }

  createOrder(formValues: any): void {
    const userId = this.getUserId();
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
            this.selectedPaymentMethod === 3 ? this.selectedCreditCard : null,
        },
      ],
    };

    this.apiService.postWithAuth<CartOrder>(this.ordersUrl, order).subscribe({
      next: (createdOrder) => {
        alert('¡Pedido creado exitosamente!');
        this.dismissModal();
        this.clearCart();
      },
      error: (error) => {
        // console.error('Error creating order:', error);
        alert('¡Error al crear el pedido!');
      },
    });
  }

  dismissModal(): void {
    this.renderer.setAttribute(
      this.modalForm.nativeElement,
      'data-bs-dismiss',
      'modal'
    );
    this.modalForm.nativeElement.click();
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
