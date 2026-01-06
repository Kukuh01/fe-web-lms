import axios from "axios";
import { isCurrentlyLoggingOut, logout } from "./auth.service";
import { getAccessToken } from "./token.service";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url || "";
    const status = error.response?.status;

    console.log(`Error terjadi di URL: ${url} dengan Status: ${status}`);

    if (
      status === 401 &&
      !url.includes("login") &&
      !url.includes("logout") &&
      !isCurrentlyLoggingOut()
    ) {
      alert("Sesi Anda telah berakhir.");
      logout();
    }

    return Promise.reject(error);
  }
);
export default api;
