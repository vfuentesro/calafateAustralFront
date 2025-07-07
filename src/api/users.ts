import api from './config';

export const fetchUsers = async () => {
  const response = await api.get('usuarios/');
  return response.data;
}; 