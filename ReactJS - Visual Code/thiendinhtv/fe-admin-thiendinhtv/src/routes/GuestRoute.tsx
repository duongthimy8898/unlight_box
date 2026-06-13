import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';

const isAuthenticated = () => !!localStorage.getItem('token');

const GuestRoute = ({ children }: { children: ReactNode }) => {
  return !isAuthenticated() ? children : <Navigate to="/dashboard" replace />;
};

export default GuestRoute;