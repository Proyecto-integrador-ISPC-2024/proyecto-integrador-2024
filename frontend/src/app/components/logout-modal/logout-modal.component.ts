import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  standalone : true,
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.css'],
  imports: [CommonModule]
})
export class LogoutModalComponent  {

  constructor(private authService: AuthService, private router: Router) { }

  logout() {
    this.authService.logout();
    alert('Sesión cerrada');
    this.router.navigate(['login']);
  }
}
