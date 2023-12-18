import React from "react";

//redux
import { Controller, useFormContext } from "react-hook-form";

// MUI
import { TextField } from "@mui/material";

// types
import { UpdateProfileInputs } from "../@types/user";

function UpdateProfileForm() {
  const {
    control,
    formState: { errors },
  } = useFormContext<UpdateProfileInputs>();

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
        name="avatar"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="avatar"
            variant="outlined"
            error={Boolean(errors.avatar)}
            helperText={errors.avatar?.message}
          />
        )}
      />

      <Controller
        name="phoneNumber"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="phoneNumber"
            variant="outlined"
            error={Boolean(errors.phoneNumber)}
            helperText={errors.phoneNumber?.message}
          />
        )}
      />
    </>
  );
}

export default UpdateProfileForm;
