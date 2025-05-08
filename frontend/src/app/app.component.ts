import { CommonModule }   from '@angular/common';
import { Component }      from '@angular/core';
import { RouterOutlet }   from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HeaderComponent }    from './layout/header/header.component';
import { FooterComponent }    from './layout/footer/footer.component';
import { AuthInterceptor }    from './interceptor/auth-interceptor.interceptor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    HeaderComponent,
    FooterComponent,
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