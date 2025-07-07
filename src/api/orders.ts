import api from './config';

export const fetchOrders = async () => {
  const response = await api.get('ventas/');
  return response.data;
}; 