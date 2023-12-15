import {
  Box,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

//redux-store
import { useAppDispatch } from "../../../redux/store";

//component
import LoadingButton from "../../LoadingButton";

//types
import { BannerInputs, TBanner } from "../../../@types/banner";

//reducers
import {
  addNewBanner,
  updateAdminBanner,
} from "../../../redux/reducers/admin/adminBannerReducer";

// yup validation shchema
const validationSchema = yup.object().shape({
  image: yup.string().required("Banner Image is required"),
  position: yup.string().required("position is required"),
  page: yup.string().required("page is required"),
});

// component props type
type AdminBannerFormProps = {
  handleClose: () => void;
  banner?: TBanner | null;
};

function AdminBannerForm({ handleClose, banner = null }: AdminBannerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useAppDispatch();

  // react hook form with yup validation
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    formState: { errors },
  } = useForm<BannerInputs>({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    if (banner) {
      setValue("image", banner.image);
      setValue("position", banner.position);
      setValue("page", banner.page);
    }
  }, [banner]);

  // form submit handler
  const onSubmit = async (data: BannerInputs) => {
    setIsSubmitting(true);
    // update or create
    if (banner) {
      const bannerData: TBanner = { ...data, _id: banner._id };
      await dispatch(updateAdminBanner(bannerData));
    } else {
      await dispatch(addNewBanner(data));
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
            name="image"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                required
                fullWidth
                label="Banner Image Link"
                variant="outlined"
                error={Boolean(errors.image)}
                helperText={errors.image?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="position"
            control={control}
            render={({ field }) => (
              <FormControl
                {...field}
                required
                fullWidth
                error={Boolean(errors.position)}
              >
                <InputLabel>Select a position</InputLabel>
                <Select
                  {...field}
                  name="position"
                  value={field.value ?? ""}
                  label="Select Banner Position"
                  variant="outlined"
                  error={Boolean(errors.position)}
                >
                  <MenuItem value="top">Top</MenuItem>
                  <MenuItem value="middle">Middle</MenuItem>
                  <MenuItem value="bottom">Bottom</MenuItem>
                </Select>
                {errors.position?.message ? (
                  <FormHelperText>{errors.position?.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="page"
            control={control}
            render={({ field }) => (
              <FormControl
                {...field}
                required
                fullWidth
                error={Boolean(errors.page)}
              >
                <InputLabel>Select a Page</InputLabel>
                <Select
                  {...field}
                  defaultValue="any"
                  name="page"
                  value={field.value ?? ""}
                  label="Select a Page"
                  variant="outlined"
                  error={Boolean(errors.page)}
                >
                  <MenuItem value="home">Home</MenuItem>
                  <MenuItem value="products">Products Page</MenuItem>
                  <MenuItem value="category_products">
                    Category Products
                  </MenuItem>
                  <MenuItem value="search">Search Page</MenuItem>
                </Select>
                {errors.page?.message ? (
                  <FormHelperText>{errors.page?.message}</FormHelperText>
                ) : null}
              </FormControl>
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

export default AdminBannerForm;
