import { Product } from "./product";

export interface Payments {
  id: number;
  userId: number;
  products: Product[];
  itemsAmount: number;
  totalPrice: number;
  paymentMethod: string;
  status: string;
}
