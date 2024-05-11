import { Routes } from '@angular/router';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CartComponent } from './pages/cart/cart.component';

export const routes: Routes = [
    { path: 'about', component: AboutUsComponent },

    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'cart',
        component: CartComponent,
    }
];
