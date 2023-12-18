import React from "react";
import { Navigate } from "react-router-dom";

// types
import { TRouteProps } from "../@types/routers";

// routers
import { ROUTES } from "./routers";

function AdminRoute({ Component, userRole, ...rest }: TRouteProps) {
  return userRole === "ADMIN" ? (
    <Component {...rest} />
  ) : (
    // Permission denied. Forbidden page maybe?
    <Navigate to={ROUTES.HOME} replace />
  );
}

export default AdminRoute;
