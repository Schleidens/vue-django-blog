// ApiService.js
import axios from 'axios';

const ApiService = axios.create({
  baseURL: import.meta.env.BASE_URL,
});

export default ApiService;
