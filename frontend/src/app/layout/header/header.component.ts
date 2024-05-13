import { Component, OnInit } from '@angular/core';
import { ThemeButtonComponent } from '../../components/theme-button/theme-button.component';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ThemeButtonComponent, RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  showHomeLink = true;
  showAboutLink = true;
  showProductsLink = true;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentUrl = event.urlAfterRedirects;
        this.updateNavbarLinks(currentUrl);
      }
    });
  }

  updateNavbarLinks(currentUrl: string): void {
    this.showHomeLink = currentUrl.includes('/'); /* Fix here */
    this.showAboutLink = !currentUrl.includes('/about');
    this.showProductsLink = !currentUrl.includes('/products');
  }
}
