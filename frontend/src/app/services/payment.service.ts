import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CartList } from '../interfaces/cartList';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private httpClient: HttpClient) {}

  // usersUrl = 'https://66525119813d78e6d6d53814.mockapi.io/users'
  private paymentsUrl = 'https://664d5d12ede9a2b556534efe.mockapi.io/payments';

  checkout(
    userId: number,
    productId: number,
    quantity: number,
    paymentMethod: string,
    cartItems: CartList,
    itemsAmount: number,
    totalPrice: number,
    status: string
  ): Observable<any> {
    const body = {
      userId,
      productId,
      quantity,
      paymentMethod,
      cartItems,
      itemsAmount,
      totalPrice,
      status,
    };
    return this.httpClient.post(`${this.paymentsUrl}`, body);
  }

  updateProductStock(id: number, stock: number): Observable<any> {
    return this.httpClient.put(`${this.paymentsUrl}/${id}`, { stock });
  }

  // Aquí asumimos que tienes una API backend para recibir los detalles del pago
  /* sendPaymentDetails(paymentDetails: any): Observable<any> {
    const djangoApiUrl = 'http://localhost:8000/receive-payment';
    return this.httpClient.post(djangoApiUrl, paymentDetails);
  } */
}
