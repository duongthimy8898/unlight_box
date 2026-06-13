import { useEffect, useState, type ReactNode } from "react";
import { AuthContext } from "../contexts/Auth.context";
import type { InternalUser } from "../types/data.type";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<InternalUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    // Lấy dữ liệu từ localStorage (nếu có)
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");
    console.log(storedToken, storedUser)
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (token: string, user: InternalUser) => {
    console.log("Login", token, user)
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token }}>{children}</AuthContext.Provider>;
}
