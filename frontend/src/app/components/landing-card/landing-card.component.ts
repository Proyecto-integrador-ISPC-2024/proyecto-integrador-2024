import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './landing-card.component.html',
  styleUrl: './landing-card.component.css'
})
export class LandingCardComponent {

}
