import { CommonModule }   from '@angular/common';
import { Component }      from '@angular/core';
import { RouterLink }     from '@angular/router';
import { RouterOutlet }   from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent }    from './layout/header/header.component';
import { FooterComponent }    from './layout/footer/footer.component';
import { LandingComponent }   from './pages/landing/landing.component';
import { ProductsComponent }  from './pages/products/products.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CartComponent }      from './pages/cart/cart.component';
import { AuthInterceptor }    from './interceptor/auth-interceptor.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    CommonModule,
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    ProductsComponent,
    DashboardComponent,
    CartComponent,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Tienda de campeones';
}