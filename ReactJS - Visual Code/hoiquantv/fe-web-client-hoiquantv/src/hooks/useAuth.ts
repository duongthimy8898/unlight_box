// src/hooks/useAuth.ts
import { useContext } from "react";
import { AuthContext } from "../contexts/Auth.context";

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
