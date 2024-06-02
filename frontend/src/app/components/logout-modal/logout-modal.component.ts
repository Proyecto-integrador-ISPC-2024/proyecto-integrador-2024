import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.css']
})
export class LogoutModalComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Lógica para cerrar sesión
    this.authService.logout(); // Llama al método de logout de tu servicio de autenticación si tienes uno
    // Después de cerrar sesión, redirige a la página de inicio de sesión
    this.router.navigate(['/login']);
  }

}
