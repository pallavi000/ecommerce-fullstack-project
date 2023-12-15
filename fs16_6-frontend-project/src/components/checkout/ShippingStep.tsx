import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

// MUI
import {
  Box,
  Typography,
  FormControl,
  FormLabel,
  FormControlLabel,
  RadioGroup,
  Radio,
  Divider,
  Button,
} from "@mui/material";

//redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";

//reducers
import { fetchUserAddress } from "../../redux/reducers/addressReducer";

// components
import CustomModal from "../CustomModal";
import AddressForm from "../AddressForm";

//icons
import AddIcon from "@mui/icons-material/Add";

type ShippingStepProps = {
  shippingId: string | null;
  setShippingId: Dispatch<SetStateAction<string | null>>;
  handleNext: Function;
};
function ShippingStep({
  shippingId,
  setShippingId,
  handleNext,
}: ShippingStepProps) {
  const dispatch = useAppDispatch();

  // adding new address?
  const [isAddNewAddressOpen, setIsAddNewAddressOpen] = useState(false);

  // addresses
  const addresses = useSelector((state: AppState) => state.addresses.data);
  // make sure default address is first on the list
  const sortedAddress = [...addresses];
  sortedAddress.sort((a, b) =>
    a.isDefault === b.isDefault ? 0 : a.isDefault ? -1 : 1
  );

  // fetch address
  useEffect(() => {
    dispatch(fetchUserAddress());
  }, []);
  // set active address
  useEffect(() => {
    if (addresses.length) {
      const defaultAddress = addresses.find((address) => address.isDefault);
      setShippingId(defaultAddress ? defaultAddress._id : addresses[0]._id);
    }
  }, [addresses]);

  // address handle change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShippingId((event.target as HTMLInputElement).value);
  };

  return (
    <>
      {/* addresses list */}
      {shippingId ? (
        <FormControl fullWidth>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <FormLabel>Your Addresses</FormLabel>
            <Button
              variant="contained"
              size="small"
              disabled={!Boolean(shippingId)}
              onClick={() => handleNext()}
            >
              Next
            </Button>
          </Box>
          <Divider sx={{ marginTop: 2, marginBottom: 2 }} />
          <RadioGroup value={shippingId} onChange={handleChange}>
            {sortedAddress.map((address) => {
              return (
                <FormControlLabel
                  key={address._id}
                  value={address._id}
                  control={<Radio />}
                  label={
                    <Box sx={{ padding: 2 }}>
                      <Typography variant="subtitle2">
                        {address.fullname}
                      </Typography>
                      <Typography variant="body2">{address.city}</Typography>
                      <Typography variant="body2">
                        {address.street}, {address.zipCode}
                      </Typography>
                      <Typography variant="body2">{address.country}</Typography>
                      <Typography variant="body2">
                        Phone number: {address.phone}
                      </Typography>
                    </Box>
                  }
                />
              );
            })}
          </RadioGroup>
        </FormControl>
      ) : null}
      {/* add new address */}
      <Button
        variant="contained"
        size="small"
        color="primary"
        endIcon={<AddIcon />}
        sx={{ marginTop: 2 }}
        onClick={() => setIsAddNewAddressOpen(true)}
      >
        Add New Address
      </Button>
      {/* Add new Address Modal */}
      <CustomModal
        modalTitle="Add New Address"
        isOpen={isAddNewAddressOpen}
        onClose={setIsAddNewAddressOpen}
        component={<AddressForm handleNext={setIsAddNewAddressOpen} />}
      />
    </>
  );
}

export default ShippingStep;
