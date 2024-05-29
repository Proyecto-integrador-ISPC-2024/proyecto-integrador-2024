import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../../../services/products.service';
import { Product } from '../../../interfaces/product';
import { Products } from '../../../interfaces/products';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  

  products: Product[] = [];
  totalProducts: number = 0;

  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: 0,
    size: '',
    stock: 0,
  };

  constructor(private productsService: ProductsService) {}

  // Get products
  fetchProducts() {
    this.productsService
      .getProducts('https://664d5d12ede9a2b556534efe.mockapi.io/products')
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          this.totalProducts = data.total;
          console.log(data);
        
        
        },
        error: (error: Error) => {
          console.log(error);
        }
      });
      
  }

  ngOnInit(){
    this.fetchProducts();
  }
}