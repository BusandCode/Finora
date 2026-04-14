import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
}

const AdminRoute = ({ children }: Props) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin") {
    // Attempted to access admin page without proper role
    return <Navigate to="/user/dashboard" replace />;
  }

  return children;
};

export default AdminRoute;
