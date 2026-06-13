// src/api/axiosClient.ts
import axios from "axios";

const axiosCustom = axios.create({
  baseURL: import.meta.env.VITE_SERVER_API_BASE_URL || "https://sv.hoiquantv.xyz/api/v1/external",
  timeout: 10000,
});

// Thêm interceptor để tự động chèn token
axiosCustom.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Xử lý lỗi 401 (token hết hạn)
axiosCustom.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      console.warn("⚠️ Token hết hạn hoặc không hợp lệ — logout user");
      localStorage.removeItem("accessToken");
      // Option: tự động redirect về trang login
      // window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default axiosCustom;
