import { Component } from '@angular/core';
import { PaymentsComponent } from '../../components/payments/payments.component';
import { CartResumeComponent } from '../../components/cart-resume/cart-resume.component';
import { CartListComponent } from '../../components/cart-list/cart-list.component';
import { Product } from '../../../interfaces/product';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [PaymentsComponent, CartResumeComponent, CartListComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems: Product[] = [
    {
      name: 'Camiseta Argentina 2021',
      price: 28,
      size: ['S', 'M', 'L', 'XL', 'XXL'],
      stock: [10, 20, 32, 15],
      image:
        'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076239/tienda-de-campeones/argentina/Argentina-2021-Primera_txaoeb.webp',
      id: 1,
      variant: '',
      amount: 5,
    },
    {
      name: 'Camiseta Argentina 1986',
      price: 51,
      size: ['S', 'M', 'L', 'XL', 'XXL'],
      stock: [10, 20, 32, 15],
      image:
        'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076239/tienda-de-campeones/argentina/Argentina-1986-segunda_obwyax.webp',
      id: 2,
      variant: '',
      amount: 5,
    },
    {
      name: 'Camiseta Brasil 1994',
      price: 35,
      size: ['S', 'M', 'L', 'XL', 'XXL'],
      stock: [],
      image:
        'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076299/tienda-de-campeones/brazil/Brasil-1994-primera_jzmckh.webp',
      id: 3,
      variant: '',
      amount: 5,
    },
    {
      name: 'Camiseta Brasil 2002',
      price: 83,
      size: ['S', 'M', 'L', 'XL', 'XXL'],
      stock: [10, 20, 32, 15],
      image:
        'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076301/tienda-de-campeones/brazil/Brasil-2002-primera_b9hdli.webp',
      id: 4,
      variant: '',
      amount: 5,
    },
    {
      name: 'Camiseta Italia 2006',
      price: 89,
      size: ['S', 'M', 'L', 'XL', 'XXL'],
      stock: [10, 20, 32, 15],
      image:
        'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076445/tienda-de-campeones/italy/Italia-2006-Primera_dc6vuf.webp',
      id: 5,
      variant: '',
      amount: 5,
    },
    {
      name: 'Camiseta Italia 1982',
      price: 11,
      size: ['S', 'M', 'L', 'XL', 'XXL'],
      stock: [10, 20, 32, 15],
      image:
        'https://res.cloudinary.com/dqs5ckpbp/image/upload/v1717076441/tienda-de-campeones/italy/Italia-1982-Primera_jywdi3.webp',
      id: 6,
      variant: '',
      amount: 5,
    },
  ];

  getTotalPrice(): number {
    return this.cartItems.reduce(
      (total, item) => total + item.price * item.amount,
      0
    );
  }

  handleCartUpdate(updatedCartItems: Product[]): void {
    this.cartItems = updatedCartItems;
  }
}
