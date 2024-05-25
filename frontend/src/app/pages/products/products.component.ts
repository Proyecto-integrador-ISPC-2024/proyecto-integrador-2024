import { Component } from '@angular/core';
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
export class ProductsComponent {
  constructor(private productsService: ProductsService) {}

  products: Product[] = [];
  totalProducts: Number = 0;

  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: 0,
    size: '',
    stock: 0,
  };

  // Get products
  fetchProducts() {
    this.productsService
      .getProducts('https://664d5d12ede9a2b556534efe.mockapi.io/products')
      .subscribe({
        next: (data: Products) => {
          this.products = data.items;
          //! this.totalProducts = data.total; -> Ver si es necesario tener contabilizada la cantidad total de productos
          console.log(data) /* Este log muestra los datos que llegan desde el llamado con GET, la idea es asignar a la propiedad products declarada en línea 17 los datos que llegan desde la petición, el problema es que al hacer el console.log en la función ngOnInit, el array se devuelve vacío tal como se declaró, por lo que asumo que no se asignan los valores en la propiedad products de línea 17 */
        },
        error: (error: Error) => {
          console.log(error);
        }
      });
      // console.log(this.products) -> Este log devuelve un array vacío que corresponde a la propiedad de línea 17
  }

  ngOnInit(){
    this.fetchProducts();
    /*
    Probé de esta manera ya que la petición es asincrónica pero el log devuelve undefined
    setTimeout(() => {
      console.log(this.products);
    }, 5000)

    */


    console.log(this.products); // Este log devuelve el array vacío de productos que se declaró en línea 17
  }
}
