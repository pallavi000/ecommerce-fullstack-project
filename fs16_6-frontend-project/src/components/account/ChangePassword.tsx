import React from "react";

// MUI
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";

//redux state
import { AppState, useAppDispatch } from "../../redux/store";

//types
import { TUpdatePasswordInput } from "../../@types/user";

//reducers
import { changePassword } from "../../redux/reducers/authReducer";

// yup validation schema
const validationSchema = yup.object().shape({
  currentPassword: yup.string().required("CurrentPassword is required"),
  newPassword: yup.string().required("NewPassword is required"),
  confirmPassword: yup.string().required("ConfirmPassword  is required"),
});

function ChangePassword() {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<TUpdatePasswordInput>({
    resolver: yupResolver(validationSchema),
  });

  // app dispatch
  const dispatch = useAppDispatch();

  //current user
  const { user } = useSelector((state: AppState) => ({
    user: state.auth.user,
  }));
  const onSubmit = (data: TUpdatePasswordInput) => {
    if (user) {
      dispatch(changePassword(data));
    }
    reset();
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Change Password
      </Typography>
      <Card
        sx={{
          minWidth: 256,
          textAlign: "center",
          marginTop: 2,
        }}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <CardContent>
          <Grid container spacing={3} sx={{ mt: 2, mb: 1 }}>
            <Grid item xs={12} sm={12}>
              <Controller
                name="currentPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="Current Password"
                    variant="outlined"
                    error={Boolean(errors.currentPassword)}
                    helperText={errors.currentPassword?.message}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <Controller
                name="newPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="New Password"
                    variant="outlined"
                    error={Boolean(errors.newPassword)}
                    helperText={errors.newPassword?.message}
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    label="ConfirmPassword"
                    variant="outlined"
                    error={Boolean(errors.confirmPassword)}
                    helperText={errors.confirmPassword?.message}
                  />
                )}
              />
            </Grid>
          </Grid>

          <Button
            sx={{ marginTop: "1rem", marginBottom: "1rem", float: "right" }}
            type="submit"
            variant="contained"
          >
            Submit
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default ChangePassword;
