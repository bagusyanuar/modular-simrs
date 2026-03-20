import type { RouteObject } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

export const authRoutes: RouteObject[] = [
  {
    path: '/',
    lazy: () =>
      import('../pages').then((m) => ({
        Component: m.LoginPage,
      })),
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
];
