import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProductComponent } from '../../components/card-product/card-product.component';
import { ApiService } from '../../../services/api.service';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  private urlTemplate = 'https://664d5d12ede9a2b556534efe.mockapi.io/products';

  countries: string[] = ['Argentina', 'Brasil', 'Italia']; // Lista de países disponibles
  selectedCountry: string = this.countries[0];

  products: Product[] = [];
  filteredProducts: Product[] = [];

  fetchProducts(): void {
    this.apiService.get<Product[]>(this.urlTemplate).subscribe({
      next: (data: Product[]) => {
        console.log('Fetched data:', data);
        if (Array.isArray(data)) {
          this.products = data;
          this.filterProductsByCountry();
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

  filterProductsByCountry(): void {
    // Filtrar los productos cuyo nombre contiene el nombre del país seleccionado
    this.filteredProducts = this.products.filter(product => product.name.toLowerCase().includes(this.selectedCountry.toLowerCase()));
  }


  onCountryChange(country: string): void {
    this.selectedCountry = country;
    this.filterProductsByCountry();
  }

  ngOnInit(): void {
    this.fetchProducts();
  }
}
