import apiClient from '../client/apiClient';

export const login = async (email: string, password: string) => {
  const response = await apiClient.post('/auth/login', { email, password });

  // guarda token no localStorage (ou cookie)
  localStorage.setItem('token', response.data.token);
  localStorage.setItem('user', JSON.stringify(response.data.user));

  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  window.location.href = '/login';
};

export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const getToken = () => {
  return localStorage.getItem('token');
};
