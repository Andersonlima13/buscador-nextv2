
// configuracao da api aqui

import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError
} from 'axios';

// definimos de onde vem o back end
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3050';

const apiClient: AxiosInstance = axios.create({
  baseURL: API_URL, // api aqui
  withCredentials: true, // Importante para CORS com credenciais
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor de Request com tipagem correta (debugar se foi para a api correta)
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const fullUrl = `${config.baseURL}${config.url}`;
    
    console.log('[AXIOS] Request para:', fullUrl);
    console.log('Variáveis de ambiente:', {
      API_URL: process.env.NEXT_PUBLIC_API_URL,
      NODE_ENV: process.env.NODE_ENV
    });

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor de Response com tipagem correta
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;