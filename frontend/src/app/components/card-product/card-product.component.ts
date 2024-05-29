import { Component, Input } from '@angular/core';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {

  @Input() product: Product = {
    id: 0,
    name: "",
    price: 0,
    image: "",
    amount: 0,
    size: "",
    stock: 0,
    variant: ""
  }

}
