import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart-resume',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './cart-resume.component.html',
  styleUrl: './cart-resume.component.css'
})
export class CartResumeComponent {
  formBuilder = inject(FormBuilder);
  formGroup = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email], []],
    phone: ['', Validators.required],
    address: ['', Validators.required],
    payment: ['', Validators.required],
    terms: ['', Validators.requiredTrue]
  })

  clickRegister(): void {
    const name = this.formGroup.controls.name.value;
    const email = this.formGroup.controls.email.value;
    const phone = this.formGroup.controls.phone.value;
    const address = this.formGroup.controls.address.value;
    const payment = this.formGroup.controls.payment.value;
    const terms = this.formGroup.controls.terms.value;
    console.log(name);
    console.log(email);
    console.log(phone);
    console.log(address)
    console.log(payment);
    console.log(terms);
  }

  onEnviar(event: Event) {
    console.log(this.formGroup.value)
    event.preventDefault;
    if (this.formGroup.valid) {
      alert("Enviando formulario al servidor...")
    }
    else {
      this.formGroup.markAllAsTouched(),
        alert("Por favor, complete todos los campos.");
    }
  }


}
