import { Products } from './products';

export interface Payments {
  id: number;
  userId: number;
  products: Products[];
  itemsAmount: number;
  totalPrice: number;
  paymentMethod: string;
  status: string;
}
