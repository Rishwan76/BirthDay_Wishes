import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/** Wraps admin-only pages; redirects to login if not authenticated. */
const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useAuth();

  if (loading) return <p style={{ padding: 40 }}>Loading...</p>;
  if (!admin) return <Navigate to="/admin/login" replace />;

  return children;
};

export default ProtectedRoute;
