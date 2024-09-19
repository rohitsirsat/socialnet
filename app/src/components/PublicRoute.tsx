import { useAuth } from "@/context/AuthContext";
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

// Define the Public component which takes in children as its prop

const PublicRoute: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Destructure token and user from the authentication context
  const { token, user } = useAuth();

  // If there is a valid token and user ID, navigate the user to the home page
  if (token && user?._id) return <Navigate to="/home" />;

  return children;
};

export default PublicRoute;
