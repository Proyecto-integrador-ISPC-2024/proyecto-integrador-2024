export interface Order {
  id: number;
  client: string;
  createdAt: string;
  totalPrice: string;
  status: string;
  items: Set<string>;
}
