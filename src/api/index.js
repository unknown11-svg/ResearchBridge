import axios from "axios";
import useStore from "../zustand/research.js";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:5000/api";

// Configure axios instance
const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json"
  }
});

// Request interceptor for auth token
apiClient.interceptors.request.use(config => {
  const { token } = useStore.getState().profile || {};
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      useStore.getState().logout();
      window.location.href = "/login";
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

const API = {
  AUTH: {
    authenticate: (token) => apiClient.post("/auth/authenticate", { token }),
    logout: () => apiClient.post("/auth/logout")
  },
  USER: {
    getAll: () => apiClient.get("/users"),
    getById: (id) => apiClient.get(`/users/${id}`),
    update: (id, data) => apiClient.put(`/users/${id}`, data),
    delete: (id) => apiClient.delete(`/users/${id}`)
  }
};

export default API;