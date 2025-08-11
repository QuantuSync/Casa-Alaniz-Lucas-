import React from "react";
import { Navigate, useLocation } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
  adminOnly?: boolean;
}

export default function ProtectedRoute({
  children,
  adminOnly = false,
}: ProtectedRouteProps) {
  const location = useLocation();
  const authStatus = localStorage.getItem("alanizAuth");
  const userType = localStorage.getItem("alanizUserType");
  const userId = localStorage.getItem("alanizUserId");

  // Verificar autenticación básica
  if (authStatus !== "ok" || !userId) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Verificar acceso de administrador si es requerido
  if (adminOnly && userType !== "admin") {
    return <Navigate to="/sede-electronica" replace />;
  }

  return <>{children}</>;
}
