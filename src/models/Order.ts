export interface Order {
  id_detalleventa: number;
  cantidad_dv: number;
  precio_unitario_dv: number;
  subtotal_dv: number;
  id_venta?: number;
  id_producto?: number;
  estado?: string;
  numero_seguimiento?: string;
} 