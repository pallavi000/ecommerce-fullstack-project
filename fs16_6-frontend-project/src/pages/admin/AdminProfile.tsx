import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

//redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";

// MUI
import { Box, Container, Typography } from "@mui/material";

// components
import UserForm from "../../components/UserForm";
import LoadingButton from "../../components/LoadingButton";

// types
import { UpdateUserInputs } from "../../@types/user";

// reducers
import { updateUser } from "../../redux/reducers/admin/adminUserReducer";

// yup validation schema
const validationSchema = yup.object().shape({
  firstName: yup.string().required("firstName is required"),
  lastName: yup.string().required("lastName is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional(),
  role: yup.string().oneOf(["ADMIN", "USER"]).required("Role is required"),
});

function AdminProfile() {
  const dispatch = useAppDispatch();

  // auth user state
  const { user } = useSelector((state: AppState) => ({
    user: state.auth.user,
  }));
  const { isLoading } = useSelector((state: AppState) => ({
    isLoading: state.adminUsers.isLoading,
  }));

  const methods = useForm<UpdateUserInputs>({
    resolver: yupResolver(validationSchema),
  });
  const {
    handleSubmit,
    resetField,
    setValue,
    formState: { errors },
  } = methods;

  // set default value
  React.useEffect(() => {
    if (user) {
      setValue("email", user.email);
      setValue("firstName", user.firstName);
      setValue("lastName", user.lastName);
      setValue("avatar", user.avatar);
      setValue("role", user.role || "USER");
    }
  }, [user]);

  // form submit handler
  const onSubmit = async (data: UpdateUserInputs) => {
    if (!user) return;
    await dispatch(updateUser({ id: user._id, data }));
    resetField("password");
  };

  return (
    <Container maxWidth="sm">
      <FormProvider {...methods}>
        <Box
          component={"form"}
          onSubmit={handleSubmit(onSubmit)}
          sx={{ padding: "1rem", textAlign: "center" }}
        >
          <Typography variant="h4" marginBottom={"1rem"}>
            Update Profile
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
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
            <LoadingButton
              isLoading={isLoading}
              title="Update"
              color="primary"
            />
          </Box>
        </Box>
      </FormProvider>
    </Container>
  );
}

export default AdminProfile;
