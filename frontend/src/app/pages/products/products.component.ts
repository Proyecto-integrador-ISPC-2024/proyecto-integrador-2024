import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { CommonModule, NgForOf, NgIf } from '@angular/common';
import { Product } from '../../interfaces/product';
import { LoadingSpinnerComponent } from '../../components/spinner/spinner.component';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';
import { CardProductComponent } from '../../components/card-product/card-product.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    CommonModule,
    CardProductComponent,
    NgForOf,
    NgIf,
    LoadingSpinnerComponent,
  ],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  readonly cdr = Inject(ChangeDetectorRef);

  constructor(
    private apiService: ApiService,
    private cartService: CartService
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
