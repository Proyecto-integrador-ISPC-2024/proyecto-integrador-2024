import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Products } from '../interfaces/products';

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    constructor(private apiService: ApiService) {}

    // Get/Read
    getProducts = (
        url: string,
    ): Observable<Products> => {
        return this.apiService.get(url, {
            responseType: 'json',
        });
    };

    // Create
    addProduct = (url: string, body: any): Observable<any> => {
        return this.apiService.post(url, body, {});
    };

    // Update
    editProduct = (url: string, body: any): Observable<any> => {
        return this.apiService.put(url, body, {});
    };

    // Delete
    deleteProduct = (url: string): Observable<any> => {
        return this.apiService.delete(url, {});
    };
}
