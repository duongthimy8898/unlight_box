// src/context/AuthContext.tsx
import { createContext } from "react";
import type { InternalUser } from "../types/data.type";

interface AuthContextType {
  user: InternalUser | null;
  token: string | null;
  login: (token: string, user: InternalUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
