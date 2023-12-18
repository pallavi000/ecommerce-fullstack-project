import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../../redux/store";

// MUI
import { Box, Button, DialogActions, TextField } from "@mui/material";

// reducers
import {
  addNewCategory,
  updateAdminCategory,
} from "../../../redux/reducers/admin/adminCategoryReducer";

// types
import { TCategoryInputs, TCategory } from "../../../@types/category";

// components
import LoadingButton from "../../LoadingButton";

// yup validation schema
const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  image: yup.string().required("Image Link is required"),
});

// component props type
type CategoryFormProps = {
  category?: TCategory | null;
  onClose: Function;
};

export default function CategoryForm({
  category = null,
  onClose,
}: CategoryFormProps) {
  const dispatch = useAppDispatch();
  // react hook form with yup validation
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<TCategoryInputs>({
    resolver: yupResolver(validationSchema),
  });

  React.useEffect(() => {
    if (category) {
      setValue("name", category.name);
      setValue("image", category.image);
    }
  }, [category]);

  // user state
  const isLoading = useSelector(
    (state: AppState) => state.adminCategories.isLoading
  );

  // form submit handler
  const onSubmit = async (data: TCategoryInputs) => {
    if (category) {
      await dispatch(updateAdminCategory({ id: category._id, data }));
    } else {
      await dispatch(addNewCategory(data));
    }
    reset();
    onClose();
  };

  return (
    <React.Fragment>
      <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
            padding: "2rem 0rem",
          }}
        >
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                label="Category name"
                variant="outlined"
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
              />
            )}
          />
          <Controller
            name="image"
            control={control}
            render={({ field }) => (
              <TextField
                fullWidth
                {...field}
                label="Category image link"
                variant="outlined"
                error={Boolean(errors.image)}
                helperText={errors.image?.message}
              />
            )}
          />
        </Box>
        <DialogActions>
          <Button variant="outlined" color="error" onClick={() => onClose()}>
            Cancel
          </Button>
          <LoadingButton
            isLoading={isLoading}
            color="success"
            title={category ? "Update" : "Create"}
          />
        </DialogActions>
      </Box>
    </React.Fragment>
  );
}
