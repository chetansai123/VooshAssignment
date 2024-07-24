import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token'); // Example, implement your own auth check

    return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;