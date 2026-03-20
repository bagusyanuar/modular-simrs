import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@genmedical/auth/hooks';

export function PublicRoute() {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
