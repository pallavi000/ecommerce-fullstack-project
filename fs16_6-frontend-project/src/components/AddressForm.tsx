import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// MUI
import { Box, Grid, TextField } from "@mui/material";

// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../redux/store";

//types
import { TAddress, TAddressInput, TAddressInputData } from "../@types/address";

//reducers
import { addNewAddress, updateAddress } from "../redux/reducers/addressReducer";

//component
import LoadingButton from "./LoadingButton";

// yup validation schema
const validationSchema = yup.object().shape({
  fullname: yup.string().required("Full Name is required"),
  city: yup.string().required("City is required"),
  street: yup.string().required("Street is required"),
  zipCode: yup.string().required("Zip code is required"),
  country: yup.string().required("Country is required"),
  phone: yup.string().required("Phone is required"),
});

// compoenent props type
type AddressFormProps = {
  handleNext: Function;
  buttonText?: string;
  address?: TAddress | null;
  type?: "create" | "update";
};

export default function AddressForm({
  handleNext,
  buttonText = "submit",
  address = null,
  type = "create",
}: AddressFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // react hook form with yup validation
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TAddressInput>({
    resolver: yupResolver(validationSchema),
  });

  React.useEffect(() => {
    if (address) {
      setValue("city", address.city);
      setValue("country", address.country);
      setValue("street", address.street);
      setValue("fullname", address.fullname);
      setValue("phone", address.phone);
      setValue("zipCode", address.zipCode);
    }
  }, [address]);

  // app dispatch
  const dispatch = useAppDispatch();

  const { user } = useSelector((state: AppState) => ({
    user: state.auth.user,
  }));

  // form submit handler
  const onSubmit = async (data: TAddressInput) => {
    if (user) {
      setIsSubmitting(true);
      const addressData: TAddressInputData = {
        ...data,
        user: user._id,
      };
      // create address
      if (type === "create") {
        await dispatch(addNewAddress(addressData));
      }
      //update address
      if (type === "update" && address) {
        await dispatch(
          updateAddress({ addressId: address._id, data: addressData })
        );
      }
      setIsSubmitting(false);
    }
    handleNext();
  };
  return (
    <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3} sx={{}}>
        <Grid item xs={12} sm={12}>
          <Controller
            name="fullname"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                size="small"
                fullWidth
                label="Full name (First and Last name)"
                variant="outlined"
                error={Boolean(errors.fullname)}
                helperText={errors.fullname?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <Controller
            name="country"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Country"
                variant="outlined"
                error={Boolean(errors.country)}
                helperText={errors.country?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="city"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="City"
                variant="outlined"
                error={Boolean(errors.city)}
                helperText={errors.city?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="street"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                label="Street"
                size="small"
                variant="outlined"
                error={Boolean(errors.street)}
                helperText={errors.street?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="zipCode"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Zip / Postal code"
                variant="outlined"
                error={Boolean(errors.zipCode)}
                helperText={errors.zipCode?.message}
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name="phone"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                fullWidth
                size="small"
                label="Mobile number"
                variant="outlined"
                error={Boolean(errors.phone)}
                helperText={errors.phone?.message}
              />
            )}
          />
        </Grid>
      </Grid>
      <Box sx={{ marginTop: 4, marginBottom: 0, float: "right" }}>
        <LoadingButton
          isLoading={isSubmitting}
          color="success"
          title={buttonText}
        />
      </Box>
    </Box>
  );
}
