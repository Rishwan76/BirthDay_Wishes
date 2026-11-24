import axios from "axios";

// Central axios instance. Vite dev server proxies /api to the backend (see vite.config.js).
const api = axios.create({
  baseURL: "/api",
});

// Attach admin JWT token (if present) to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
