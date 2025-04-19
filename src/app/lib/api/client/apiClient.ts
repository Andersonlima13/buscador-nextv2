/// Configuração BASE do Axios/fetch
// fazendo aqui a configuracao da api , onde conectaremos com o back-end em node js


// src/lib/api/client/apiClient.ts
import axios from 'axios';

// 1. Configuração base
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Sua URL base
  timeout: 10000, // 10 segundos
  headers: {
    'Content-Type': 'application/json',
  }
});



apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tratamento global de erros
    if (error.response?.status === 401) {
      window.location.href = '/login'; // Redireciona se não autorizado
    }
    return Promise.reject(error);
  }
);

export default apiClient;