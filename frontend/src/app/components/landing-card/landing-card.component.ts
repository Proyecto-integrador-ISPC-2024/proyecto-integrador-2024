import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProductsComponent } from '../../pages/products/products.component';

@Component({
  selector: 'app-landing-card',
  standalone: true,
  imports: [CommonModule, RouterLink, ProductsComponent],
  templateUrl: './landing-card.component.html',
  styleUrl: './landing-card.component.css'
})
export class LandingCardComponent {

}
