export interface Product {
  id_producto: number;
  sku: string;
  nombre_p: string;
  descripcion_p?: string;
  precio_p: number;
  stock_p: number;
  peso_kg?: number;
  alto_cm?: number;
  ancho_cm?: number;
  largo_cm?: number;
  id_categoria?: number;
  id_oferta?: number;
  imagen?: string;
} 