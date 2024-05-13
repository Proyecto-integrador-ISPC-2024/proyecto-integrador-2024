import { Component } from '@angular/core';
import { ThemeButtonComponent } from '../../components/theme-button/theme-button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ThemeButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
