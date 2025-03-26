import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const PermissionGuard = ({ children, requiredPermissions = [] }) => {
    const location = useLocation();

    // Validates user permissions by checking:
    // 1. If user is authenticated
    // 2. If user has required permissions
    const validatePermissions = () => {
        const token = localStorage.getItem('authToken');
        const userData = localStorage.getItem('userData');
        console.log(requiredPermissions, "requiredPermissions");
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

            // Get user permissions from userData
            const parsedUserData = JSON.parse(userData);
            const userPermissions = parsedUserData.permissions || {};

            // If no specific permissions are required, allow access
            if (requiredPermissions.length === 0) {
                return true;
            }
            // Check if user has all required permissions
            return requiredPermissions.every(permission => {
                const [resource, action] = permission.split(':');
                const hasPermission = userPermissions[resource]?.[action] == true;
                return hasPermission;
            });

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

    // If permission validation fails, redirect to unauthorized page or home
    if (!validatePermissions()) {
        // clearSession();
        return <Navigate to="/unauthorized" replace state={{ from: location }} />;
    }

    // If validation passes, render the protected content
    return children;
};

export default PermissionGuard;