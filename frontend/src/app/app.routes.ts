import { Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CartComponent } from './pages/cart/cart.component';
import { LandingComponent } from './pages/landing/landing.component';
import { ProductsComponent } from './pages/products/products.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ClientDashboardComponent } from './pages/client-dashboard/client-dashboard.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';

export const routes: Routes = [
  { path: '', component: LandingComponent },

  { path: 'about', component: AboutUsComponent },

  { path: 'dashboard', component: DashboardComponent },

  { path: 'cart', component: CartComponent },

  { path: 'products', component: ProductsComponent },

  { path: 'contact', component: ContactComponent },

  { path: 'admin-dashboard', component: AdminDashboardComponent },

  { path: 'client-dashboard', component: ClientDashboardComponent },

  { path: '**', component: NotFoundComponent },
];
/*@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }*/
