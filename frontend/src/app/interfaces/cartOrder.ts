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
    id_tarjeta?: number | null;
  }>;
}
