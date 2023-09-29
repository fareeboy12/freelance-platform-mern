import React from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../context/authContext';

const ProtectedRoutes = ({ accountType }) => {
  const { userData } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem('token');

  if(token){
    //if authenticated
    return accountType.find((role) => userData?.accountType.includes(role)) ? (
      <Outlet />
    ) : userData?.firstName ? (
      navigate("/unauthorized")
    ) : (
      navigate("/login")
    );
  }

  return navigate("/login");
}

export default ProtectedRoutes;