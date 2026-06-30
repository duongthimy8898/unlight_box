// shared/lib/apiClient.ts
import axios from "axios";
import envConfig from "../../app/configs/env.config";
// import { useAuthStore } from "../../features/auth/store";

export const apiClient = axios.create({
  baseURL: envConfig.BACKEND_API_URL,
  timeout: 10000,
});

// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) config.headers.Authorization = `Bearer ${token}`;
//   return config;
// });

// apiClient.interceptors.response.use(
//   (res) => res,
//   (error) => {
//     if (error.response?.status === 401) {
//       // token hết hạn → logout
//       useAuthStore.getState().logout();
//     }
//     return Promise.reject(error);
//   },
// );
