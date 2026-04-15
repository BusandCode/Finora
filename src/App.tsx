import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

import UserDashboard from "./pages/user/Dashboard";
import ApplyLoan from "./pages/user/ApplyLoan";
import MyLoans from "./pages/user/MyLoans";
import Profile from "./pages/user/Profile";
import Repayments from "./pages/user/Repayments";
import Transactions from "./pages/user/Transactions";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLoanRequests from "./pages/admin/AdminLoanRequests";
import AdminUsers from "./pages/admin/AdminUsers";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import { useAuth } from "./context/AuthContext";
import LandingPage from "./pages/landing/LandingPage";

import NotFound from "./pages/NotFound";

function App() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* ================= AUTH ROUTES ================= */}
        <Route
          path="/login"
          element={user ? <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"} /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to={user.role === "admin" ? "/admin/dashboard" : "/user/dashboard"} /> : <Register />}
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

        {/* ================= ADMIN ROUTES ================= */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/requests"
          element={
            <AdminRoute>
              <AdminLoanRequests />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />

        {/* ================= DEFAULT & 404 ================= */}
        <Route path="/" element={<LandingPage/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
