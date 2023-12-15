import React from "react";

//redux
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";

//types
import { TUserPermission } from "../@types/permission";

//components
import NoPermission from "../components/NoPermission";

const withPermission = (
  WrappedComponent: React.FC,
  requiredPermission: TUserPermission
) => {
  return () => {
    const currentUser = useSelector((state: AppState) => state.auth.user);
    if (!currentUser?.permission) {
      return <NoPermission />;
    }
    const hasPermission = currentUser.permission.find(
      (permission) => permission.name === requiredPermission
    );
    if (!hasPermission) {
      return <NoPermission />;
    }
    return <WrappedComponent />;
  };
};

export default withPermission;
