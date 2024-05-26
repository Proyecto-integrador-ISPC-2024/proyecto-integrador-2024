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

  passwordsMatchValidator(): ValidatorFn | null {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password1');
      const confirmPassword = control.get('password2');

      if (!password || !confirmPassword) {
        return null;
      }
      return password.value === confirmPassword.value ? { passwordsMatch : true } : null;
    };
  } 

  onEnviar(event: Event): void {
    event.preventDefault;
    if (this.form.valid) {
      console.log("Enviando formulario...");
      this.authService.createUser(this.form.value as User).subscribe(
        (data: User) => {
          console.log(data.id);
          console.log(this.form.value as User)
          if (data.id > 0) {
            alert("Registro exitoso. A continuación, por favor Inicie Sesión.");
            this.router.navigate(['/iniciar-sesion']) // falta agregar el modal de inicio de sesion
  }
        })
    }
    else {
      this.form.markAllAsTouched();
    }
  }


}
