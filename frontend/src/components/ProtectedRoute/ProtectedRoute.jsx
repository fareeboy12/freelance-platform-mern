import React from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/authContext';

const ProtectedRoute = ({ element, allowedAccountTypes }) => {
  const { userData } = useUser();
  const navigate = useNavigate();

  // Check if the user is authenticated
  const isAuthenticated = !!userData.userId;

  // Check if the user's account type is allowed
  const isAccountTypeAllowed = allowedAccountTypes.includes(userData.accountType);

  if (!isAuthenticated) {
    // Redirect to the login page if not authenticated
    return navigate("/login");
  }

  if (!isAccountTypeAllowed) {
    // Redirect to the login page if account type is not allowed
    return navigate("/login");
  }

  // Render the protected component if authenticated and account type is allowed
  return <Route element={element} />;
};

export default ProtectedRoute;