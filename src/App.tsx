import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import UserDashboard from './pages/user/Dashboard';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';
import ApplyLoan from './pages/user/ApplyLoan';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        
        {/* Redirect root to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Redirect root to user dashboard */}
        <Route path="/user/dashboard" element={<UserDashboard />} />
        {/* Redirect root to apply loan dashboard */}
        <Route path="/user/apply-loan" element={<ApplyLoan />} />
        
        {/* 404 - Redirect to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;