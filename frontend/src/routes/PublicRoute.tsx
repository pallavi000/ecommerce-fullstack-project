import React from "react";

// types
import { TRouteProps } from "../@types/routers";

function PublicRoute({ Component, userRole, ...rest }: TRouteProps) {
  return <Component {...rest} />;
}

export default PublicRoute;
