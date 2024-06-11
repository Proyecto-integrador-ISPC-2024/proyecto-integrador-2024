import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ThemeButtonComponent } from '../../components/theme-button/theme-button.component';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RegisterFormComponent } from '../../components/register-form/register-form.component';
import { ModalService } from '../../services/modalstatus.service';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ThemeButtonComponent,RegisterFormComponent, RouterLink, CommonModule, RouterLinkActive,LoginFormComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  showHomeLink = true;
  showAboutLink = true;
  showProductsLink = true;

  constructor(private router: Router, private modalService: ModalService) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects;
        this.updateNavbarLinks(currentUrl);
      }
    });
    this.modalService.registerModalVisible$.subscribe(visible => {
      this.modalFormVisible = visible;
    });
  }

  modalFormVisible = false;
  modalRegisterForm() {
    this.modalService.showRegisterModal();
  }

  updateNavbarLinks(currentUrl: string): void {
    this.showHomeLink = currentUrl.includes('/'); /* Fix here */
    this.showAboutLink = !currentUrl.includes('/about');
    this.showProductsLink = !currentUrl.includes('/products');
  }
  //modalFormVisible = false;
  //modalRegisterForm() {
  //  this.modalFormVisible = true;
 // }

  toggleTheme(event: Event){
    console.log(event)
  }
}
