import { Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CartComponent } from './pages/cart/cart.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ProductsComponent } from './pages/products/products.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path:'', component: LandingComponent },

  { path: 'about', component: AboutUsComponent },

  { path: 'dashboard', component: DashboardComponent },

  { path: 'cart', component: CartComponent },

  { path:'products', component: ProductsComponent },

  { path: '**', component: NotFoundComponent },

];
