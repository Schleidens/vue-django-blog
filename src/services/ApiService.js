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

ApiService.interceptors.response.use(
  (response) => {
    // Return the response as is if no error occurred
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // Token expired or authentication failed
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default ApiService;
