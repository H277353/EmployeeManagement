import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
  const isAuthenticated = localStorage.getItem('authToken'); // Check if the token exists

  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/" state={{ message: 'Login first to access the list' }} />
  );
};

export default PrivateRoute;
