import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

api.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (response) => {
    const status = response.response ? response.response.status : null;
    if (status === 401) {
      window.location.href = '/login';
      localStorage.removeItem('token');
      console.log('Interceptado 401: ', localStorage.getItem('token'));
    }

    return Promise.reject(response);
  },
);

export default api;
