import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  title = 'app-products';
  welcome= 'Bienvenidos';
  tasks= [
    'Instalar Angular',
    'Crear Proyecto',
    'Crear Componente',
    'Crear Servicio',
  ]

}


