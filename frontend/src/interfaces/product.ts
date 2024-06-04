
export interface Product {
  id_producto_talle?: number;

  productos: {
    id_producto: number;
    imagen: string;
    nombre_producto: string;
    precio: number;
  };

  talles: {
    talles: string[];
    stock: number[];
  };

  cantidad: number;
  talleSeleccionado: string;
  stockSeleccionado: number;
}
