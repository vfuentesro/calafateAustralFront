import apiClient from './config';

export const fetchProducts = async () => {
  const response = await apiClient.get('/api/productos/');
  return response.data;
}; 