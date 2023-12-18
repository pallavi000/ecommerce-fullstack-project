import * as React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

//mui
import {
  Alert,
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  FormLabel,
  Stack,
} from "@mui/material";

// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../../redux/store";

// components
import UserForm from "../../UserForm";
import LoadingButton from "../../LoadingButton";
import CustomModal from "../../CustomModal";
import PermissionsPickerModal from "../../PermissionsPickerModal";

// reducers
import {
  addNewUser,
  updateUser,
} from "../../../redux/reducers/admin/adminUserReducer";
import { getCurrentUser } from "../../../redux/reducers/authReducer";

// types
import { RegisterInputs, TUser, UpdateUserInputs } from "../../../@types/user";

//hooks
import usePermission from "../../../hooks/userPermission";

// yup validation shchema
const validationSchema = yup.object().shape({
  firstName: yup.string().required("firstName is required"),
  lastName: yup.string().required("lastName is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),

  role: yup.string().oneOf(["ADMIN", "USER"]).required("Role is required"),
});

const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
});

// component props type
type AdminUserFormProps = {
  user?: TUser | null;
  onClose: () => void;
};

export default function AdminUserForm({
  user = null,
  onClose,
}: AdminUserFormProps) {
  const dispatch = useAppDispatch();
  const [isPermissionModalOpen, setIsPermissionModalOpen] =
    React.useState(false);

  const permissions = useSelector(
    (state: AppState) => state.adminPermissions.data
  );

  // user state
  const isLoading = useSelector(
    (state: AppState) => state.adminUsers.isLoading
  );
  // current user
  const currentUser = useSelector((state: AppState) => state.auth.user);

  // react hook form with yup validation
  const methods = useForm<RegisterInputs | UpdateUserInputs>({
    resolver: yupResolver(
      user ? validationSchema : validationSchema.concat(passwordSchema)
    ),
  });
  const { handleSubmit, reset, watch, setValue, getValues } = methods;

  // set default value for avatar
  React.useEffect(() => {
    setValue("avatar", "https://i.imgur.com/fpT4052.jpeg");
    if (user) {
      setValue("email", user.email);
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("avatar", user.avatar ?? "");
      const permissionIds = user.permission?.map((p) => p._id);
      setValue("permission", permissionIds);
      setValue("role", user.role || "USER");
    }
  }, [user]);

  // form submit handler
  const onSubmit = async (data: RegisterInputs | UpdateUserInputs) => {
    if (user) {
      await dispatch(updateUser({ id: user._id, data }));
      if (currentUser?._id === user._id) dispatch(getCurrentUser());
    } else if ("password" in data) {
      await dispatch(addNewUser(data as RegisterInputs));
    }
    reset();
    onClose();
  };

  const handlePermissionsSelect = (selectedPermissions: string[]) => {
    setValue("permission", selectedPermissions);
    setIsPermissionModalOpen(false);
  };

  const getPermissionNameFromId = (id: string) => {
    let permission = permissions.find((p) => p._id === id);
    if (!permission && user?.permission?.length) {
      permission = user.permission.find((p) => p._id === id);
    }
    return permission ? permission.name : "UNKNOWN";
  };

  return (
    <FormProvider {...methods}>
      <CustomModal
        modalTitle="Select Permissions"
        component={
          <PermissionsPickerModal
            permissions={permissions}
            selectedPermissions={getValues("permission") ?? []}
            handleSubmit={handlePermissionsSelect}
          />
        }
        isOpen={isPermissionModalOpen}
        onClose={() => setIsPermissionModalOpen(false)}
        maxWidth="md"
      />
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            padding: "2rem 0rem",
          }}
        >
          <UserForm />
        </Box>
        <FormControl>
          <FormLabel>Permissions:</FormLabel>
          {watch("permission")?.length ? (
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={1}
              flexWrap={"wrap"}
              marginBottom={1}
              marginTop={1}
            >
              {watch("permission")?.map((permissionId) => {
                if (!permissionId) return;
                return (
                  <Chip
                    key={permissionId}
                    label={getPermissionNameFromId(permissionId)}
                    size="small"
                    color="success"
                  />
                );
              })}
            </Stack>
          ) : (
            <Alert severity="error" sx={{ marginTop: 2, marginBottom: 2 }}>
              No Permissions Selected.
            </Alert>
          )}
          <Button
            sx={{ width: "fit-content" }}
            variant="contained"
            color="info"
            onClick={() => setIsPermissionModalOpen(true)}
            disabled={!usePermission("PERMISSIONS_READ")}
          >
            {usePermission("PERMISSIONS_READ")
              ? "Select Permissions"
              : "Permission 'PERMISSION_READ' required to update"}
          </Button>
        </FormControl>
        <Divider sx={{ marginBottom: 2, marginTop: 2 }} />
        <LoadingButton
          isLoading={isLoading}
          color="success"
          title={user ? "Update" : "Create"}
        />
      </Box>
    </FormProvider>
  );
}
