import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

//mui
import {
  Box,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

//redux
import { useAppDispatch } from "../../../redux/store";
//types
import { TPermission, TPermissionInput } from "../../../@types/permission";

//components
import LoadingButton from "../../LoadingButton";

//reducers
import {
  addNewPermission,
  updatePermission,
} from "../../../redux/reducers/admin/adminPermissionReducer";

//constant
const PERMISSION_ACTIONS = ["READ", "CREATE", "UPDATE", "DELETE"];

// yup validation shchema
const validationSchema = yup.object().shape({
  name: yup.string().required("NAME is required"),
  action: yup.string().required("action is required"),
  description: yup.string().optional(),
});

// component props type
type AdminPermissionFormProps = {
  handleClose: () => void;
  permission?: TPermission | null;
};

function AdminPermissionForm({
  handleClose,
  permission = null,
}: AdminPermissionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [permissionName, setPermissionName] = useState<string>();
  const dispatch = useAppDispatch();

  // react hook form with yup validation
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<TPermissionInput>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (permission) {
      setPermissionName(permission.name);
      const permissionNameArray = permission.name.split("_");
      setValue("name", permissionNameArray[0]);
      setValue("action", permissionNameArray[1]);
      setValue("description", permission.description);
    }
  }, [permission]);

  // form submit handler
  const onSubmit = async (data: TPermissionInput) => {
    setIsSubmitting(true);
    const formData = {
      name: permissionName || `${data.name.toUpperCase()}_${data.action}`,
      description: data.description,
    };
    // update or create
    if (permission) {
      await dispatch(updatePermission({ id: permission._id, data: formData }));
    } else {
      await dispatch(addNewPermission(formData));
    }
    reset();
    setIsSubmitting(false);
    handleClose();
  };

  const handlePermissionChange = () => {
    const permissionName = getValues("name");
    const permissionAction = getValues("action");
    if (permissionName) {
      setValue("name", permissionName.toUpperCase());
    }
    if (!permissionName || !permissionAction) return;
    setPermissionName(`${permissionName}_${permissionAction}`); // converting name & action into i.e. PRODUCTS_READ;
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                onBlur={handlePermissionChange}
                label="Permission Name i.e: PRODUCTS"
                variant="outlined"
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <Controller
            name="action"
            control={control}
            render={({ field }) => {
              console.log(field.value);
              return (
                <FormControl
                  {...field}
                  error={Boolean(errors.action)}
                  fullWidth
                >
                  <InputLabel>Select a Action</InputLabel>
                  <Select
                    {...field}
                    value={field.value ?? ""}
                    label="Select a Action"
                    variant="outlined"
                    onBlur={handlePermissionChange}
                  >
                    {PERMISSION_ACTIONS.map((pa) => {
                      return (
                        <MenuItem value={`${pa}`} key={pa}>
                          {pa}
                        </MenuItem>
                      );
                    })}
                  </Select>
                  {errors.action?.message ? (
                    <FormHelperText>{errors.action?.message}</FormHelperText>
                  ) : null}
                </FormControl>
              );
            }}
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                multiline
                rows={4}
                fullWidth
                label="Description (Optional)"
                variant="outlined"
                error={Boolean(errors.description)}
                helperText={errors.description?.message}
              />
            )}
          />
        </Grid>
        {permissionName ? (
          <Grid item xs={12} sm={12}>
            <Typography variant="subtitle2" gutterBottom>
              Following Permission will be created:
            </Typography>
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={1}
              flexWrap={"wrap"}
            >
              <Chip label={permissionName} color="success" size="small" />
            </Stack>
          </Grid>
        ) : null}
      </Grid>
      <Box sx={{ marginTop: 4, marginBottom: 0, float: "right" }}>
        <LoadingButton
          isLoading={isSubmitting}
          color="success"
          title={"Submit"}
        />
      </Box>
    </Box>
  );
}

export default AdminPermissionForm;
