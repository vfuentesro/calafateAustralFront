import axios from 'axios';
import { getCookie } from './csrf';

// Configuración base de axios
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  withCredentials: true,
  headers: {
    // 'Content-Type': 'application/json', // Eliminado para permitir multipart/form-data
    'Accept': 'application/json'
  },
  timeout: 10000
});

// Interceptor para manejar tokens y CSRF
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token && token !== 'undefined' && token !== 'null') {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  // Agregar CSRF solo en métodos que lo requieren
  const method = config.method ? config.method.toUpperCase() : '';
  if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
    const csrfToken = getCookie('csrftoken');
    if (csrfToken) {
      config.headers['X-CSRFToken'] = csrfToken;
    }
  }
  return config;
});

export default apiClient; 