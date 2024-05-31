import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { CardProductComponent } from '../../components/card-product/card-product.component';
import { ApiService } from '../../../services/api.service';
import { Product } from '../../../interfaces/product';
import { Products } from '../../../interfaces/products';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CardProductComponent, NgForOf, NgIf],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  private urlProducts = 'https://664d5d12ede9a2b556534efe.mockapi.io/products';

  products: Product[] = [];

  fetchProducts(): void {
    this.apiService.get<Product[]>(this.urlProducts).subscribe({
      next: (data: Product[]) => {
        console.log('Fetched data:', data);
        if (Array.isArray(data)) {
          this.products = data;
        } else {
          console.error('Data structure is incorrect:', data);
        }
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
      complete: () => {
        // console.log('Products fetch completed');
      },
    });
  }

  selectedProducts: Products = { items: [], total: 0 };

  ngOnInit(): void {
    this.fetchProducts();
  }
}
