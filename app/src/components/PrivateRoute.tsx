import { useAuth } from "@/context/AuthContext";
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, token } = useAuth();

  // If there is no token or user ID, redirect to the login page
  if (!token && !user?._id) return <Navigate to="/sign-in" />;

  return children;
};

export default PrivateRoute;
