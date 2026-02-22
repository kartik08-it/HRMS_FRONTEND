import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import Dashboard from "../pages/dashboard/Dashboard";
import CreateNote from "../pages/notes/createNote";
import ProtectedRoute from "../ProtectedRoute";
import Layout from "../components/layout/Layout/layout";

const AppRoutes = () => {
  const isAuthenticated = localStorage.getItem("auth");

  return (
    <Routes>
      {/* Default Route */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Layout Wrapper */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/notes/new" element={<CreateNote />} />
      </Route>

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;