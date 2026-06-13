// routes/ProtectedRoute.tsx
import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { useAuth } from "../hooks/useAuth.hook";

const adminOnlyPaths = ["/dashboard/sports", "/dashboard/teams", "/dashboard/leagues", "/dashboard/internal-users"];

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  // Nếu path hiện tại nằm trong danh sách adminOnlyPaths
  // nhưng role không phải administrator → chuyển hướng về "/"
  if (adminOnlyPaths.includes(location.pathname) && user?.role !== "administrator") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
