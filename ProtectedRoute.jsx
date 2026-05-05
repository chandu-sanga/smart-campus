import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    // If they are logged in but don't have the right role, send them to their respective portal
    if (user.role === 'ADMIN') return <Navigate to="/admin" />;
    return <Navigate to="/user" />;
  }

  return children;
};

export default ProtectedRoute;
