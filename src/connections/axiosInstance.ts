import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://hostnick.ddns.net:6010',
  // otras configuraciones si es necesario
});

// Interceptor para manejar respuestas de error globalmente
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Maneja errores globalmente aquí
    const status = error.response?.status;
    if (status === 401) {
      // Maneja el error 401 específicamente
      console.error('No autorizado: PRO FEATURE ONLY');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
