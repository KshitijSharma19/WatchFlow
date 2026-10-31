import axios from "axios";

export const getApiBaseUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;

  // In production or on custom domains (like watchflow.app), route relatively via /api to stay on the same domain
  if (typeof window !== "undefined") {
    if (import.meta.env.PROD || !window.location.hostname.includes("localhost")) {
      return "/api";
    }
  }

  return envUrl || (import.meta.env.PROD ? "/api" : "http://localhost:5000/api");
};

const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 90000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      const currentPath = window.location.pathname;
      const protectedPrefixes = [
        "/dashboard",
        "/library",
        "/settings",
        "/playlist",
      ];
      const isProtected = protectedPrefixes.some((p) =>
        currentPath.startsWith(p)
      );
      if (isProtected) {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  },
);

export default api;
