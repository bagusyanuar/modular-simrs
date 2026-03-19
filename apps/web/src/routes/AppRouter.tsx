import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AppLayout } from '../components/AppLayout';

const LoginPage = lazy(() =>
  import('@genmedical/auth/pages').then((m) => ({ default: m.LoginPage }))
);

const DashboardPage = lazy(() =>
  import('@genmedical/dashboard/pages').then((m) => ({ default: m.DashboardPage }))
);

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-sm text-[var(--color-text-secondary)]">Memuat...</p>
    </div>
  );
}

export function AppRouter() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <AppLayout>
                <Suspense fallback={<PageLoader />}>
                  <DashboardPage />
                </Suspense>
              </AppLayout>
            }
          >
            <Route path="/dashboard" element={<DashboardPage />} />
          </Route>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}
