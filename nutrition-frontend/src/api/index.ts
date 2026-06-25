import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 10000,
});

export const setAuthToken = (token?: string) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

export default api;
