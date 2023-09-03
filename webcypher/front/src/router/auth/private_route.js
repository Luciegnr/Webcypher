import { getAccessToken, logout } from '@utils/access_token';
import { useLocation, Outlet, Navigate } from 'react-router-dom';
import React, { useEffect } from "react";

const parseJwt = (token) => {
  const decode = JSON.parse(atob(token.split('.')[1]));
  if (decode.exp * 1000 < new Date().getTime()) {
    logout();
  }
};

const RequireAuth = () => {
  const token = getAccessToken();
  const { pathname } = useLocation();

  useEffect(() => {
    if (token) {
      parseJwt(localStorage.getItem('accessToken'));
    }
  }, [token]);

  const redirectTo = pathname !== '/' ? `?redirect-to=${pathname}` : '';

  return (
    <>{token ? <Outlet /> : <Navigate to={`/connexion${redirectTo}`} replace />}</>
  );
};

export default RequireAuth;
