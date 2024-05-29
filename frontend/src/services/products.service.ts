import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Products } from '../interfaces/products';
import { Product } from '../interfaces/product';
import { ParamConfig } from '../interfaces/param-config';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiService: ApiService) {}

  // Get/Read
  getProducts = (url: string, params: ParamConfig): Observable<Products> => {
    return this.apiService.get(url, params);
  };

  // Create
  addProduct = (url: string, body: Product): Observable<Product> => {
    return this.apiService.post(url, body, {});
  };

  // Update
  editProduct = (url: string, body: Product): Observable<Product> => {
    return this.apiService.put(url, body, {});
  };

  // Delete
  deleteProduct = (url: string): Observable<Product> => {
    return this.apiService.delete(url, {});
  };
}
