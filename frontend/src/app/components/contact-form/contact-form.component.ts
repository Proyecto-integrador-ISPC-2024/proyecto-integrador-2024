import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.css'
})
export class ContactFormComponent {
  formBuilder = inject(FormBuilder);
  formGroup = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email], []],
    message: ['', Validators.required]
  })


  clickRegister(): void {
    const name = this.formGroup.controls.name.value;
    const lastName = this.formGroup.controls.lastName.value;
    const email = this.formGroup.controls.email.value;
    const message = this.formGroup.controls.message.value;
    console.log(name);
    console.log(lastName);
    console.log(email);
    console.log(message);
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
