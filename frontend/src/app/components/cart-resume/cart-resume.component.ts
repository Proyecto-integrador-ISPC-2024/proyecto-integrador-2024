import { Component, inject, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../../interfaces/product';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-cart-resume',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor],
  templateUrl: './cart-resume.component.html',
  styleUrl: './cart-resume.component.css',
})
export class CartResumeComponent implements OnChanges {
  @Input() cartResume: Product[] = [];
  @Input() totalPrice: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cartResume']) {
      this.calculateTotalPrice();
    }
  }

  private calculateTotalPrice(): void {
    this.totalPrice = this.cartResume.reduce(
      (sum, product) => sum + product.price * product.amount,
      0
    );
  }



  formBuilder = inject(FormBuilder);
  formGroup = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email], []],
    //phone: ['', Validators.required],
    //address: ['', Validators.required],
    payment: ['', Validators.required],
    terms: ['', Validators.requiredTrue],
  });

  clickRegister(): void {
    const name = this.formGroup.controls.name.value;
    const email = this.formGroup.controls.email.value;
    //const phone = this.formGroup.controls.phone.value;
    //const address = this.formGroup.controls.address.value;
    const payment = this.formGroup.controls.payment.value;
    const terms = this.formGroup.controls.terms.value;
    console.log(name);
    console.log(email);
    //console.log(phone);
    //console.log(address)
    console.log(payment);
    console.log(terms);
  }

  onEnviar(event: Event) {
    console.log(this.formGroup.value);
    event.preventDefault;
    if (this.formGroup.valid) {
      alert('Enviando formulario al servidor...');
    } else {
      this.formGroup.markAllAsTouched(),
        alert('Por favor, complete todos los campos.');
    }
  }
}
