import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../contexts/authContext"; // Adjust path if necessary

const ProtectedRoute = () => {
  const { currentUser, loading } = useAuth();

  console.log(
    "ProtectedRoute - currentUser:",
    currentUser,
    "loading:",
    loading
  );

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center flex-col">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
        <p>Loading authentication...</p>
      </div>
    );
  }

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
