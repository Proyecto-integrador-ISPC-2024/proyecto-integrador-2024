import { Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { CardProductComponent } from '../../components/card-product/card-product.component';
import { ApiService } from '../../../services/api.service';
import { Product } from '../../../interfaces/product';
// import { Products } from '../../../interfaces/products';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CardProductComponent, NgForOf, NgIf],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  private urlProducts = 'https://664d5d12ede9a2b556534efe.mockapi.io/products';

  // categories: string[] = ['Category 1', 'Category 2', 'Category 3', 'Category 4', 'Category 5'];
  // selectedCategory: string = this.categories[0];

  products: Product[] = [];
  // filteredProducts: Product[] = [];

  fetchProducts(): void {
    this.apiService.get<Product[]>(this.urlProducts).subscribe({
      next: (data: Product[]) => {
        console.log('Fetched data:', data);
        if (Array.isArray(data)) {
          this.products = data;
          // this.filteredProducts();
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

  /* filterProducts(): void {
    this.filteredProducts = this.products.filter(product => product.category === this.selectedCategory);
  } */

  /* onCategoryChange(category: string): void {
    this.selectedCategory = category;
    this.filterProducts();
  } */

  ngOnInit(): void {
    this.fetchProducts();
  }
}