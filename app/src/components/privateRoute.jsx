// Import required modules and types from React and react-router-dom libraries
import { useAuth } from "@/context/Auth/AuthContext";
import React from "react";
import { Navigate } from "react-router-dom";

// Define a PrivateRoute component that wraps child components to ensure user authentication
const PrivateRoute = ({ children }) => {
  // Check if there's a token and user ID
  const { token, user } = useAuth();

  // If there's no token or user ID, redirect to the login page
  if (!token || !user?._id) return <Navigate to="/login" replace />;

  // If authenticated, render the child components
  return children;
};

// Export the PrivateRoute component for use in other parts of the application
export default PrivateRoute;
