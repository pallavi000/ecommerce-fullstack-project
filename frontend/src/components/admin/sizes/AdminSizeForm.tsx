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
import React, { useEffect, useState } from "react";

//redux-store
import { useAppDispatch } from "../../../redux/store";

//types
import { SizeInputs, TSize } from "../../../@types/size";

//reducers
import {
  addNewSize,
  updateAdminSize,
} from "../../../redux/reducers/admin/adminSizeReducer";

//components
import LoadingButton from "../../LoadingButton";

// yup validation shchema
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
});

type AdminSizeFormProps = {
  handleClose: () => void;
  size?: TSize | null;
};
function AdminSizeForm({ handleClose, size = null }: AdminSizeFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  // react hook form with yup validation
  const {
    handleSubmit,
    control,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<SizeInputs>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (size) {
      setValue("name", size.name);
    }
  }, [size]);

  // form submit handler
  const onSubmit = async (data: SizeInputs) => {
    setIsSubmitting(true);
    // update or create
    if (size) {
      await dispatch(updateAdminSize({ id: size._id, data }));
    } else {
      await dispatch(addNewSize(data));
    }
    reset();
    setIsSubmitting(false);
    handleClose();
  };

  return (
    <Box
      component={"form"}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete="off"
    >
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Size Name"
                variant="outlined"
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />
            )}
          />
        </Grid>
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

export default AdminSizeForm;
