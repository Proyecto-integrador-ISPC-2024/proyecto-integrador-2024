import { Component, Input, Output } from '@angular/core';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css',
})
export class CardProductComponent {
  @Input() product: Product = {
      name: '',
      price: 0,
      size: [],
      stock: [],
      image: '',
      id: 0,
      variant: "",
      amount: 0
    };

  // @Output()

  // addProduct() {}




}
