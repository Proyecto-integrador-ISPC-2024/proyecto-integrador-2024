import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { ApiService } from './api.service';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private apiService: ApiService) {}

  // Get/Read
  getUsers = (url: string): Observable<Users> => {
    return this.apiService.get(url);
  };

  // Create
  addProduct = (url: string, body: User): Observable<User> => {
    return this.apiService.post(url, body);
  };

  // Update
  editProduct = (url: string, body: User): Observable<User> => {
    return this.apiService.put(url, body);
  };

  // Delete
  deleteProduct = (url: string): Observable<User> => {
    return this.apiService.delete(url);
  };
}
