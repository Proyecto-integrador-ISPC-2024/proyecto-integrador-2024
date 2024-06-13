import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { CardProductComponent } from '../../components/card-product/card-product.component';
import { ApiService } from '../../../services/api.service';
import { Product } from '../../../interfaces/product';
import { CartService } from '../../../services/cart.service';
import { RouterLink } from '@angular/router';
import { LoadingSpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    CardProductComponent,
    NgForOf,
    NgIf,
    RouterLink,
    LoadingSpinnerComponent,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private cartService: CartService,
    private cdr: ChangeDetectorRef
  ) {}

  private urlProductos = 'http://localhost:8000/productos/';
  products: Product[] = [];
  filteredProducts: Product[] = [];

  loading = false;

  fetchProducts(country: string): void {
    this.loading = true;

    // `${this.urlProductos}?pais=${country}`
    this.apiService
      .get<Product[]>(`${this.urlProductos}?pais=${country}`)
      .subscribe({
        next: (data: Product[]) => {
          if (Array.isArray(data)) {
            this.products = data;
            this.filteredProducts = data;
          }
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error fetching products:', error);
          this.loading = false;
        },
      });
  }

  handleAddToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  ngOnInit(): void {}
}
