export enum EstadoPedido {
  Pending = 'Pendiente',
  Accepted = 'Aceptado',
  Cancelled = 'Cancelado',
}

export interface Order {
  id: number;
  id_usuario: number;
  fecha_creacion: string;
  id_productos: number[];
  status: EstadoPedido
  amount: number[];
  subtotal: number[];
  precio_total: number;
  metodo_pago: string;
}


/*
Enviar en un pedido
id_producto = datos de producto (IDs) en array
Talle
Cantidad
Subtotal

id_usuario
total
método de pago seleccionado (si es tarjeta, agregar nombre de tarjeta/id de tarjeta)
*/
