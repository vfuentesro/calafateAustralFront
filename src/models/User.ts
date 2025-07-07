export interface User {
  id: number;
  rut_numero: string;
  rut_dv: string;
  nombre_u: string;
  apellido_u: string;
  numero_telefono_u: string;
  correo_u: string;
  contrasena?: string;
  is_superuser?: boolean;
}