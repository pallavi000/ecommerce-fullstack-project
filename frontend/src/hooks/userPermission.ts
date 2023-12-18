// redux
import { useSelector } from "react-redux";
import { AppState } from "../redux/store";

//types
import { TUserPermission } from "../@types/permission";

const usePermission = (requiredPermission: TUserPermission) => {
  const currentUser = useSelector((state: AppState) => state.auth.user);
  return Boolean(
    currentUser?.permission?.find(
      (permission) => permission.name === requiredPermission
    )
  );
};

export default usePermission;
