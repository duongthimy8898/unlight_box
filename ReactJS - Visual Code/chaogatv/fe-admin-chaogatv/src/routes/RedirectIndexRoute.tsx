import { Navigate } from "react-router-dom";

const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("token");
};

const RedirectIndexRoute = () => {
  return (
    <Navigate to={isAuthenticated() ? "/dashboard" : "/auth/login"} replace />
  );
};

export default RedirectIndexRoute;
