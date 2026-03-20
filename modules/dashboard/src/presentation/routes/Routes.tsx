import type { RouteObject } from 'react-router-dom';

export const dashboardRoutes: RouteObject[] = [
  {
    path: 'dashboard',
    lazy: () =>
      import('../pages/Dashboard').then((m) => ({
        Component: m.DashboardPage,
      })),
  },
];
