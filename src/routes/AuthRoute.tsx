import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
import { useAuth } from "../hooks/useAuth";
import { NotificationProvider } from "../context/NotificationContext";

const AuthRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Navigate to="/user/list-service" />
  ) : (
    <NotificationProvider>
      <AuthLayout>
        <Outlet />
      </AuthLayout>
    </NotificationProvider>
  );
};

export default AuthRoute;
