import axios from 'axios';

// Resolve and sanitize backend API base URL
export const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    let clean = envUrl.trim().replace(/\/+$/, ''); // remove trailing slash
    if (!clean.endsWith('/api')) {
      clean = `${clean}/api`;
    }
    return clean;
  }

  // If running locally (browser on localhost / 127.0.0.1)
  if (typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')) {
    return 'http://localhost:5000/api';
  }

  // If in production on a remote domain with no VITE_API_URL set, default to same-origin /api
  return '/api';
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor to attach Authorization JWT token
api.interceptors.request.use(
  (config) => {
    // Dynamically ensure base URL is current
    config.baseURL = getApiBaseUrl();
    const token = localStorage.getItem('skill_portal_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor for 401 unauthenticated
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If unauthorized, clear storage if on protected page
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/login') && !currentPath.includes('/verify-employer') && currentPath !== '/') {
        localStorage.removeItem('skill_portal_token');
        localStorage.removeItem('skill_portal_user');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
