import { Product } from "./product";

export interface Order {
  id: number;
  userId: number;
  createdAt: Date;
  totalPrice: number;
  status: string;
  items: Product[];
}
