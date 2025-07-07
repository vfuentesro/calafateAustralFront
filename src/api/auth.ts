import axios from 'axios';

export const login = async (correo: string, contrasena: string) => {
  // Usar FormData porque el backend espera datos tipo formulario
  const formData = new FormData();
  formData.append('correo', correo);
  formData.append('contrasena', contrasena);

  const response = await axios.post('http://localhost:8000/compra/login/', formData, {
    withCredentials: true,
    headers: {
      'X-Requested-With': 'XMLHttpRequest', // Para que el backend pueda devolver JSON si lo implementas
    },
    validateStatus: () => true // Para manejar errores manualmente
  });
  return response;
};