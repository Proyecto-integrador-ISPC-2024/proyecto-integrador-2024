export interface DashboardOrder {
  id_pedido: number;
  fecha: string;
  total: number;
  id_usuario: number;
  estado: string;
  detalles: Array<{
    id_talle: number;
    cantidad: number;
    subtotal: number;
    producto: {
      id_producto: number;
      nombre_producto: string;
      precio: number;
      imagen: string;
    };
  }>;
  forma_de_pago: Array<{
    forma_de_pago_descripcion: string;
  }>;
}
