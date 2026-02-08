import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

import UserDashboard from "./pages/user/Dashboard";
import ApplyLoan from "./pages/user/ApplyLoan";

import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./context/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* ================= AUTH ROUTES ================= */}
        <Route
          path="/login"
          element={user ? <Navigate to="/user/dashboard" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/user/dashboard" /> : <Register />}
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* ================= USER ROUTES ================= */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user/apply-loan"
          element={
            <ProtectedRoute>
              <ApplyLoan />
            </ProtectedRoute>
          }
        />

        {/* ================= DEFAULT & 404 ================= */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
