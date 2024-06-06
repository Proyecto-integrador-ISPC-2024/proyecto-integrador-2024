/* File for structuring an order created in the cart, intended for send it to the backend  */
export interface CartOrder {
  id_usuario: number;
  total: number;
  detalles: Array<{
    id_talle: number;
    id_producto: number;
    cantidad: number;
    subtotal: number;
  }>;
  forma_de_pago: Array<{
    id_forma_de_pago: number;
    descripcion: string;
    tarjetas?: Array<{
      id_tarjeta: number;
      nombre_tarjeta: string;
    }>;
  }>;
}
