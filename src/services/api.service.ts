import apiClient from '../api/config';
import type { Product } from '../models/Product';
import type { Order } from '../models/Order';
import type { User } from '../models/User';

export const ProductService = {
  async getAll(): Promise<Product[]> {
    const response = await apiClient.get('/api/productos/');
    return response.data;
  },

  async getById(id: number): Promise<Product> {
    const response = await apiClient.get(`/api/productos/${id}/`);
    return response.data;
  },

  async create(product: Omit<Product, 'id'>): Promise<Product> {
    const response = await apiClient.post('/api/productos/', product);
    return response.data;
  },

  async update(id: number, product: Partial<Product>): Promise<Product> {
    const response = await apiClient.put(`/api/productos/${id}/`, product);
    return response.data;
  },

  async delete(id: number): Promise<void> {
    await apiClient.delete(`/productos/${id}/`);
  }
};

export const OrderService = {
  async getAll(): Promise<Order[]> {
    const response = await apiClient.get('/detalleventas/');
    return response.data;
  },

  async getById(id: number): Promise<Order> {
    const response = await apiClient.get(`/detalleventas/${id}/`);
    return response.data;
  },

  async create(order: Omit<Order, 'id'>): Promise<Order> {
    const response = await apiClient.post('/detalleventas/', order);
    return response.data;
  },

  async update(id: number, order: Partial<Order>): Promise<Order> {
    const response = await apiClient.put(`/detalleventas/${id}/`, order);
    return response.data;
  }
};

export const AuthService = {
  async login(email: string, password: string): Promise<any> {
    const params = new URLSearchParams();
    params.append('correo', email);
    params.append('contrasena', password);
    const response = await apiClient.post('/compra/login/', params, {
      withCredentials: true,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      validateStatus: () => true
    });
    return response;
  },

  async register(userData: {
    email: string;
    password: string;
    nombre: string;
    apellido: string;
  }): Promise<User> {
    const response = await apiClient.post('/auth/register/', userData);
    return response.data;
  },

  async getCurrentUser(): Promise<User> {
    const response = await apiClient.get('/api/auth/me/');
    return response.data;
  },

  async logout(): Promise<void> {
    await apiClient.post('/compra/logout/');
    localStorage.removeItem('token');
  }
};

export const CategoryService = {
  async getAll() {
    const response = await apiClient.get('/categorias/');
    return response.data;
  },
  async create(nombre_c: string) {
    const response = await apiClient.post('/categorias/', { nombre_c });
    return response.data;
  }
};

export const OfferService = {
  async getAll() {
    const response = await apiClient.get('/ofertas/');
    return response.data;
  },
  async create(oferta: { descuento: number, fecha_inicio: string, fecha_fin: string, estado: string }) {
    const response = await apiClient.post('/ofertas/', oferta);
    return response.data;
  }
};

export const ProductImageService = {
  async uploadImage(data: FormData) {
    const response = await apiClient.post('/imagenes-producto/', data);
    return response.data;
  },
  async deleteImage(id: number) {
    await apiClient.delete(`/imagenes-producto/${id}/`);
  }
};

export const DetalleventaService = {
  async getAll() {
    const response = await apiClient.get('/detalleventas/');
    return response.data;
  },
  async create(data: any) {
    const response = await apiClient.post('/detalleventas/', data);
    return response.data;
  },
  async update(id: number, data: any) {
    const response = await apiClient.put(`/detalleventas/${id}/`, data);
    return response.data;
  },
  async delete(id: number) {
    await apiClient.delete(`/detalleventas/${id}/`);
  }
};

export const ContactService = {
  async send(data: { nombre: string; correo: string; asunto: string; mensaje: string }) {
    const response = await apiClient.post('/api/contactos/', data)
    return response.data
  }
} 