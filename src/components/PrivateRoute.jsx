import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * PrivateRoute component to protect routes based on authentication and role.
 * @param {React.Component} Component - The component to render if authorized.
 * @param {number[]} allowedRoles - Array of allowed role_ids.
 * @param {object} rest - Other props.
 */
const PrivateRoute = ({ component: Component, allowedRoles, ...rest }) => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.rol_id)) {
    // Role not authorized
    return <Navigate to="/login" replace />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;
