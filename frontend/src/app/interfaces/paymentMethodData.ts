export interface PaymentMethodData {
  formas_de_pago: Array<{
    id_forma_de_pago: number;
    descripcion: string;
  }>;
  tarjetas?: Array<{
    id_tarjeta: number;
    nombre_tarjeta: string;
  }>;
}
