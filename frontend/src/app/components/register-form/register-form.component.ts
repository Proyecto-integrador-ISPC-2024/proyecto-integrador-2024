/* import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../interfaces/user';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,LoginFormComponent],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})

export class RegisterFormComponent {
  form: FormGroup;
  usuario: User = new User();

  constructor(private formBuilder: FormBuilder,
  private authService: AuthService, private router: Router) {
    this.form = this.formBuilder.nonNullable.group(
      {
        name: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        address: ['', [Validators.required]],
        password1: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&-])[A-Za-z\d$@$!%*?&].{8,}')]],
        password2: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&-])[A-Za-z\d$@$!%*?&].{8,}')]],
      }, { validators: this.passwordsMatchValidator });
  }
  passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password1 = control.get('password1');
    const password2 = control.get('password2');

    if (password1 && password2 && password1.value !== password2.value) {
      return { passwordsMismatch: true };
    }

    return null;
  }


  onEnviar(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      console.log("Enviando formulario...");
      this.authService.createUser(this.form.value as User).subscribe(
        (data: User) => {
          console.log(data.id);
          if (data.id > 0) {
            alert("Registro exitoso. A continuación, por favor Inicie Sesión.");
            this.authService.login(this.form.value.email, this.form.value.password1).subscribe(
              (response: any) => {
                if (response.authenticated) {
                  alert('Inicio de sesión exitoso. Bienvenido ' + response.user.email);
                  this.router.navigate(['/login-form']);
                } else {
                  alert('Ocurrió un error durante el inicio de sesión. Por favor, inténtalo de nuevo.');
                }
              },
              error => {
                console.error('Error de inicio de sesión:', error);
                alert('Ocurrió un error durante el inicio de sesión. Por favor, inténtalo de nuevo.');
              }
            );
          }
        })
    } else {
      this.form.markAllAsTouched();
    }
  }

  iniciarSesion() {
    this.router.navigate(['/login-form']);
    }

    onSubmit() {
      if (this.form.valid) {
        alert("Registro realizado exitosamente.")
      } else {
        alert("Por favor, completá todos los campos antes de registrarte.")
      }
    }
  } */
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { User } from '../../../interfaces/user';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormControl, FormGroup, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-form.component.html',
  styleUrl: './register-form.component.css'
})
export class RegisterFormComponent {
  form: FormGroup;
  usuario: User = new User();
  isSubmitting = false;
  constructor(private formBuilder: FormBuilder,
    private authService: AuthService, private router: Router) {
    this.form = this.formBuilder.nonNullable.group(
      {
        nombre: ['', [Validators.required]],
        apellido: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        domicilio: ['', [Validators.required]],
        password1: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&-])[A-Za-z\d$@$!%*?&].{8,}')]],
        password2: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&-])[A-Za-z\d$@$!%*?&].{8,}')]],
      }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const password1 = control.get('password1');
    const password2 = control.get('password2');

    if (password1 && password2 && password1.value !== password2.value) {
      return { passwordsMismatch: true };
    }

    return null;
  }

  onEnviar(event: Event): void {
    event.preventDefault;
    if (this.form.valid) {
      console.log("Enviando formulario...");
      const newUser: User = {
        nombre: this.form.get('nombre')?.value,
        apellido: this.form.get('apellido')?.value,
        email: this.form.get('email')?.value,
        // userName: this.form.get('email')?.value, 
        domicilio: this.form.get('domicilio')?.value,
        password: this.form.get('password1')?.value, 
        role: 'cliente',
        id_usuario: 0
      };

      this.authService.createUser(newUser).subscribe(
        (data: User) => {
          console.log(data.id_usuario);
          console.log(this.form.value as User)
          if (data.id_usuario > 0) {
            alert("Registro exitoso. A continuación, por favor Inicie Sesión.");
            this.disableFormFields();
          }
        })
    }
    else {
      this.form.markAllAsTouched();
    }
  }
  disableFormFields(): void {
    this.form.disable();
    this.isSubmitting = true;
  }
}