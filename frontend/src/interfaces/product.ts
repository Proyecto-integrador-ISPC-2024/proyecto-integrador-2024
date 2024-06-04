// product.ts
export interface Product {
  id_producto_talle: number;
  productos: {
    id_producto: number;
    nombre_producto: string;
    precio: number;
    imagen: string;
  };
  talles: Array<{
    id_talle: number;
    talle: string;
    stock: number;
  }>;
  cantidad: number;
  talleSeleccionado: string;
  stockSeleccionado: number;
}
