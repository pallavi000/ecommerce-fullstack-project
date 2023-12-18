import React from "react";
import { Navigate } from "react-router-dom";

// types
import { TRouteProps } from "../@types/routers";

// routers
import { ROUTES } from "./routers";

function UserRoute({ Component, userRole, ...rest }: TRouteProps) {
  // showing user side page to admins too
  return userRole === "USER" || userRole === "ADMIN" ? (
    <Component {...rest} />
  ) : (
    <Navigate to={ROUTES.SIGN_IN} replace />
  );
}

export default UserRoute;
