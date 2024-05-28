import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router , RouterLink} from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { ContactComponent } from '../../pages/contact/contact.component';
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports:[ReactiveFormsModule, CommonModule, RouterLink,ContactComponent],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})


export class LoginFormComponent {
  form: FormGroup;
  maxLoginAttempts = 3;
  loginAttempts = 0;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {
    this.form = this.formBuilder.group({
      loginEmail: ['', [Validators.required, Validators.email]],
      loginPassword: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(20)]]
    });
  }

  get loginPassword() {
    return this.form.get('loginPassword');
  }

  get loginEmail() {
    return this.form.get('loginEmail');
  }
  validarUsuario() {
    if (this.form && this.form.valid) {
      const emailControl = this.form.get('loginEmail');
      const passwordControl = this.form.get('loginPassword');

      if (emailControl && passwordControl) {
        const loginData = {
          email: emailControl.value,
          password: passwordControl.value
        };

        this.http.post<any>('https://66525119813d78e6d6d53814.mockapi.io/users/authenticate', loginData)
          .subscribe(
            response => {
              if (response.authenticated) {
                alert('Bienvenido ' + response.user.email);
                this.router.navigate(['login-form']);
              } else {
                this.loginAttempts++;
                if (this.loginAttempts >= this.maxLoginAttempts) {
                  alert('Usuario bloqueado');
                } else {
                  alert('Correo electrónico o contraseña incorrectos');
                }
              }
            },
            error => {
              console.error('Error de autenticación:', error);
              alert('Ocurrió un error durante la autenticación. Por favor, inténtalo de nuevo.');
            }
          );
      }
    }
  }
}
