import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  const validateSession = () => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    if (!token || !userData) {
      clearSession();
      return false;
    }

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      
      if (!decoded.exp || decoded.exp < currentTime) {
        clearSession();
        return false;
      }

      // Verify token matches stored userData
      const parsedUserData = JSON.parse(userData);
      if (token !== parsedUserData.token) {
        clearSession();
        return false;
      }

      return true;
    } catch {
      clearSession();
      return false;
    }
  };

  const clearSession = () => {
    localStorage.clear();
    sessionStorage.clear();
  };

  if (!validateSession()) {
    clearSession();
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
