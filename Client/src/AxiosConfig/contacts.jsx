import axios from 'axios';

// Create a new Axios instance with custom configurations
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // Set the base URL for all requests
  headers: {
    'Content-Type': 'application/json', // Set the default content type for requests
  },
});

// Add a request interceptor to update the token before each request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
