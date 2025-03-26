import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

// This is a protected route component that checks if the user is authenticated
// before allowing access to the wrapped route/component
const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // Validates the user's session by checking:
  // 1. If auth token and user data exist in localStorage
  // 2. If the token is not expired
  // 3. If the stored token matches the one in userData
  const validateSession = () => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    // Return false if token or userData don't exist
    if (!token || !userData) {
      clearSession();
      return false;
    }

    try {
      // Decode the JWT token and check if it's expired
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
      // If token decoding fails, clear session and return false
      clearSession();
      return false;
    }
  };

  // Helper function to clear all stored session data
  const clearSession = () => {
    localStorage.clear();
    sessionStorage.clear();
  };

  // If session validation fails, redirect to home page
  if (!validateSession()) {
    clearSession();
    return <Navigate to="/" replace />;
  }

  // If validation passes, render the protected content
  return children;
};

export default ProtectedRoute;
