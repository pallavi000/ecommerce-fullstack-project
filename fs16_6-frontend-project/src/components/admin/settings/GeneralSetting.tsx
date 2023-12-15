import React from "react";
import { Controller, useFormContext } from "react-hook-form";

//mui
import { Box, Stack, TextField } from "@mui/material";

//types
import { TSettingInputs } from "../../../@types/setting";

function GeneralSetting({ isDisabled = false }: { isDisabled?: boolean }) {
  const {
    control,
    formState: { errors },
  } = useFormContext<TSettingInputs>();

  return (
    <Stack spacing={4} marginTop={4}>
      <Controller
        disabled={isDisabled}
        name="websiteName"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Website Name"
            variant="outlined"
            error={Boolean(errors.websiteName)}
            helperText={errors.websiteName?.message}
          />
        )}
      />
      <Controller
        disabled={isDisabled}
        name="defaultCurrency"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Default Currency Symbol"
            variant="outlined"
            error={Boolean(errors.defaultCurrency)}
            helperText={errors.defaultCurrency?.message}
          />
        )}
      />
      <Controller
        disabled={isDisabled}
        name="websiteDescription"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            multiline
            rows={4}
            label="Website Description (Optional)"
            variant="outlined"
            error={Boolean(errors.websiteDescription)}
            helperText={errors.websiteDescription?.message}
          />
        )}
      />
      <Controller
        disabled={isDisabled}
        name="websiteTagline"
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            label="Website Tagline (Optional)"
            variant="outlined"
            error={Boolean(errors.websiteTagline)}
            helperText={errors.websiteTagline?.message}
          />
        )}
      />
    </Stack>
  );
}

export default GeneralSetting;
