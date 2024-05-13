import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { LandingCardComponent } from '../../components/landing-card/landing-card.component';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { ProductsComponent } from '../products/products.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [CommonModule,CarouselComponent, LandingCardComponent, ProductsComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {

}
