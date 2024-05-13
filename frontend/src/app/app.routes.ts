import { Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CartComponent } from './pages/cart/cart.component';
<<<<<<< HEAD
import {ProductsComponent}from './pages/products/products.component';
=======
import { NotFoundComponent } from './pages/not-found/not-found.component';

import { LandingComponent } from './pages/landing/landing.component';
>>>>>>> b1cf933fba08cc26f6383ef579684e6547ffaf77

export const routes: Routes = [
  {path:'', component: LandingComponent},
  
  { path: 'about', component: AboutUsComponent },

  {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'cart',
        component: CartComponent,
    },
    {
<<<<<<< HEAD
      path:'products',
      component:ProductsComponent,
=======
        path: '**',
        component: NotFoundComponent
>>>>>>> b1cf933fba08cc26f6383ef579684e6547ffaf77
    }
];
