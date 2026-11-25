import axios from "axios";

// In dev, Vite proxies /api to the backend (see vite.config.js).
// In production the Express server serves both the API and the built client,
// so a relative /api works. Set VITE_API_URL only if the API lives elsewhere.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
