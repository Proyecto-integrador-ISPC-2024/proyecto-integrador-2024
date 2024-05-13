import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { CartComponent } from './pages/cart/cart.component';
<<<<<<< HEAD
import { DashboardComponent } from '././pages/dashboard/dashboard.component';
import { ProductsComponent} from './pages/products/products.component';
=======
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LandingComponent } from './pages/landing/landing.component';
>>>>>>> b1cf933fba08cc26f6383ef579684e6547ffaf77

@Component({
  selector: 'app-root',
  standalone: true,
<<<<<<< HEAD
  imports: [RouterOutlet, CommonModule, CartComponent, DashboardComponent,HeaderComponent,ProductsComponent],
=======
  imports: [RouterOutlet, RouterLink, CommonModule, LandingComponent, CartComponent, DashboardComponent, HeaderComponent],
>>>>>>> b1cf933fba08cc26f6383ef579684e6547ffaf77
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Tienda de campeones';
}
