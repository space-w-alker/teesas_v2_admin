// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {

  localStorage.setItem('authToken', 'dev-token-123');
  return children;
  // const isAuthenticated = !!localStorage.getItem('authToken'); // Example token check, replace with your auth logic

  // return isAuthenticated ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
