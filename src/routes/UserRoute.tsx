import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import UserLayout from "../layout/UserLayout";
import { ServiceProvider } from "../context/ServiceProvider";
import { CategoryProvider } from "../context/CategoryProvider";
import { NotificationProvider } from "../context/NotificationContext";

const UserRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <ServiceProvider>
      <CategoryProvider>
        <NotificationProvider>
          <UserLayout>
            <Outlet />
          </UserLayout>
        </NotificationProvider>
      </CategoryProvider>
    </ServiceProvider>
  ) : (
    <Navigate to="/auth/signin" />
  );
};

export default UserRoute;
