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

 // En tu componente LogoutModalComponent
ngOnInit(): void {
  this.authService.logout();
  
  this.router.navigate(['/login']);
}


}
