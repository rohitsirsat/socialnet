// Import necessary libraries and types
import React from "react";
import { Navigate } from "react-router-dom";
import { LocalStorage } from "@/utils";

// Define the PublicRoute component which takes in children as its prop
const PublicRoute = ({ children }) => {
  // Get the token and user ID from local storage
  const token = LocalStorage.get("token");
  const user = LocalStorage.get("user");

  // If there is a valid token and user ID, navigate the user to the home page
  if (token && user?._id) return <Navigate to="/home" replace />;

  // If no token or user ID exists, render the child components as they are
  return children;
};

// Export the PublicRoute component for use in other parts of the application
export default PublicRoute;