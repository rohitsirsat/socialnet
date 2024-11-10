// Import required modules and types from React and react-router-dom libraries
import React from "react";
import { Navigate } from "react-router-dom";
import { LocalStorage } from "@/utils";

// Define a PrivateRoute component that wraps child components to ensure user authentication
const PrivateRoute = ({ children }) => {
  // Check if there's a token and user ID in local storage
  const token = LocalStorage.get("token");
  const user = LocalStorage.get("user");

  // If there's no token or user ID, redirect to the login page
  if (!token || !user?._id) return <Navigate to="/login" replace />;

  // If authenticated, render the child components
  return children;
};

// Export the PrivateRoute component for use in other parts of the application
export default PrivateRoute;
