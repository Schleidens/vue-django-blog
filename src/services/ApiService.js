// ApiService.js
import axios from 'axios';

const ApiService = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

ApiService.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Token ${token}`;
  }
  return config;
});

export default ApiService;
