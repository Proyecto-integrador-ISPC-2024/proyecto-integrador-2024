import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { RegisterFormComponent } from '../register-form/register-form.component';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RegisterFormComponent, DashboardComponent, FormsModule],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})

export class LoginFormComponent {
  email: string = '';
  password: string = '';
  passwordVisible: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        if (response && response.token) {
          // La autenticación fue exitosa
          localStorage.setItem('token', response.token);
          alert('Autenticación exitosa');
          this.router.navigate(['dashboard']);
        } else {
          // La respuesta del servidor no contiene un token
          alert('Error de autenticación: Respuesta del servidor incompleta');
        }
      },
      error: err => {
        // Ocurrió un error en la solicitud HTTP
        console.error('Error de autenticación:', err);
        alert('Error de autenticación: ' + (err.error.message || 'Ocurrió un error'));
      }
    });
  }
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    const passwordInput = document.getElementById('inputPassword') as HTMLInputElement;
    if (passwordInput) {
      passwordInput.type = this.passwordVisible ? 'text' : 'password';
    }
  }
}
/*@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink, RegisterFormComponent, DashboardComponent],
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {
  @Output() loginSuccess: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  maxLoginAttempts = 3;
  loginAttempts = 0;
  passwordVisible = false;

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
    console.log('Formulario válido:', this.form.valid);
    if (this.form && this.form.valid) {
      const email = this.loginEmail?.value;
      const password = this.loginPassword?.value;

      // Verificar si el correo y la contraseña coinciden con los valores predefinidos para poder avanzar hasta conectar el backend
      if (email === 'q@prueba.com' && password === 'Prueba123*') {
        alert('Ingreso exitoso con usuario predeterminado.');
        this.router.navigate(['dashboard']);
        return;
      }

      this.http.post<any>('https://66525119813d78e6d6d53814.mockapi.io/users', { email, password })
        .subscribe(
          response => {
            console.log('Respuesta de la API:', response);
            // Almaceno el objeto de usuario en el almacenamiento local hasta la validacion de backend ----
            localStorage.setItem('currentUser', JSON.stringify(response));
            if (response.email && response.password && response.email === email && response.password === password) {
              alert('Bienvenido ' + response.email);
              this.loginSuccess.emit(response); // Emitir evento en caso de éxito
              this.router.navigate(['dashboard']);
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

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    const passwordInput = document.getElementById('inputPassword');
    if (passwordInput) {
      passwordInput.setAttribute('type', this.passwordVisible ? 'text' : 'password');
    }
  }

  registerForm() {
    this.router.navigate(['register-form']);
  }

}


 */
