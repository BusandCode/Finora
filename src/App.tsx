import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

import UserDashboard from "./pages/user/Dashboard";
import ApplyLoan from "./pages/user/ApplyLoan";

import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import MyLoans from "./pages/user/MyLoans";
import LandingPage from "./pages/landing/LandingPage";
import Profile from "./pages/user/Profile";
import Repayments from "./pages/user/Repayments";
import Transactions from "./pages/user/Transactions";

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
        <Route
          path="/user/my-loans"
          element={
            <ProtectedRoute>
              <MyLoans />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/repayments"
          element={
            <ProtectedRoute>
              <Repayments />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/transactions"
          element={
            <ProtectedRoute>
              <Transactions />
            </ProtectedRoute>
          }
        />

        {/* ================= DEFAULT & 404 ================= */}
        <Route path="/login" element={<Navigate to="/login" replace />} />
        <Route path="/" element={<LandingPage/>} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
