// src/contexts/AuthContext.tsx
import { createContext } from "react";
import type { ExternalUser } from "../types/ExternalUser";

export type AuthContextType = {
  user: ExternalUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (identifier: string, rawPassword: string) => Promise<void>;
  logout: () => void;
  setUser: (user: ExternalUser | null) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);
