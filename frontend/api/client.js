import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

// Attach token from localStorage as a fallback to the httpOnly cookie
// (useful in dev when frontend/backend run on different ports).
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      // Let the calling page decide how to react (e.g. redirect to login)
    }
    return Promise.reject(err);
  }
);

export default api;
