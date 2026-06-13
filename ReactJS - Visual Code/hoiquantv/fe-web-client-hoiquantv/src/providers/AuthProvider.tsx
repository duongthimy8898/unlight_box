// src/providers/AuthProvider.tsx
import { useState, useEffect, type ReactNode } from "react";
import { AuthContext } from "../contexts/Auth.context";
import type { ExternalUser } from "../types/ExternalUser";
import axiosCustom from "../services/axiosCustom";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<ExternalUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("accessToken"));

  const isAuthenticated = !!user && !!token;

  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    const storedUser = localStorage.getItem("user");
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);
  // ✅ cập nhật header khi token thay đổi
  useEffect(() => {
    if (token) {
      axiosCustom.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axiosCustom.defaults.headers.common["Authorization"];
    }
  }, [token]);

  // ✅ login
  const login = async (identifier: string, rawPassword: string) => {
    const res = await axiosCustom.post("/auth/login", {
      identifier,
      rawPassword,
    });
    const { access_token, user } = res.data.data;

    // Lưu trực tiếp vào localStorage ở đây
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("user", JSON.stringify(user));

    setToken(access_token);
    setUser(user);
  };

  // Đăng xuất
  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    location.reload()
  };

  // Auto fetch profile khi có token (nếu reload trang)
  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     if (!token) return;
  //     try {
  //       const res = await axiosCustom.get("/auth/me");
  //       setUser(res.data.user);
  //     } catch {
  //       setToken(null);
  //       setUser(null);
  //     }
  //   };
  //   fetchProfile();
  // }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
