import React from "react";
import { Controller, useFormContext } from "react-hook-form";

// MUI
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

// types
import { RegisterInputs } from "../@types/user";

function UserForm() {
  const {
    control,
    setError,
    clearErrors,
    formState: { errors },
  } = useFormContext<RegisterInputs>();

  // is email available?
  const handleEmailValidation = async (
    e: React.FocusEvent<HTMLInputElement>
  ) => {
    if (!e.target.value) return;
    try {
      const data = { email: e.target.value };
      clearErrors("email");
    } catch (error) {
      setError("email", {
        type: "manual",
        message: "Email is already taken.",
      });
    }
  };

  return (
    <>
      <Controller
        name="firstName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="First name"
            variant="outlined"
            error={Boolean(errors.firstName)}
            helperText={errors.firstName?.message}
          />
        )}
      />
      <Controller
        name="lastName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Last name"
            variant="outlined"
            error={Boolean(errors.lastName)}
            helperText={errors.lastName?.message}
          />
        )}
      />
      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            onBlur={handleEmailValidation}
            label="Email"
            variant="outlined"
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <TextField
            type="password"
            {...field}
            id="outlined-basic"
            label="Password"
            variant="outlined"
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
        )}
      />
      <Controller
        name="role"
        control={control}
        render={({ field }) => (
          <FormControl {...field} error={Boolean(errors.role)}>
            <InputLabel>Select a role</InputLabel>
            <Select
              {...field}
              name="role"
              value={field.value ?? ""}
              label="Select a role"
              variant="outlined"
              error={Boolean(errors.role)}
            >
              <MenuItem value="USER">USER</MenuItem>
              <MenuItem value="ADMIN">ADMIN</MenuItem>
            </Select>
            {errors.role?.message ? (
              <FormHelperText>{errors.role?.message}</FormHelperText>
            ) : null}
          </FormControl>
        )}
      />
    </>
  );
}

export default UserForm;
