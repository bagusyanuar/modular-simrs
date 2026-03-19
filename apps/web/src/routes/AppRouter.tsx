import { lazy, Suspense } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { ProtectedRoute } from "./ProtectedRoute"

const LoginPage = lazy(() =>
    import("@genmedical/auth/pages").then((m) => ({ default: m.LoginPage }))
)

function PageLoader() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-sm text-gray-500">Memuat...</p>
        </div>
    )
}

export function AppRouter() {
    return (
        <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route path="/login" element={<LoginPage />} />

                {/* Protected routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<div>Dashboard</div>} />
                    <Route path="/" element={<Navigate to="/dashboard" replace />} />
                </Route>

                {/* Fallback */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Suspense>
    )
}