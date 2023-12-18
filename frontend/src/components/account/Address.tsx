import React, { useEffect, useState } from "react";

// MUI
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  Grid,
  Button,
} from "@mui/material";

//icons
import AddIcon from "@mui/icons-material/Add";
import CheckIcon from "@mui/icons-material/CheckCircle";

//component
import AddressForm from "../AddressForm";
import CustomModal from "../CustomModal";

//types
import { TAddress } from "../../@types/address";

//redux-state
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";

//reducers
import {
  deleteAddress,
  fetchUserAddress,
  makeAddressDefault,
} from "../../redux/reducers/addressReducer";

function Address() {
  const dispatch = useAppDispatch();

  const addresses = useSelector((state: AppState) => state.addresses.data);
  // make sure default address is first on the list
  const sortedAddress = [...addresses];
  sortedAddress.sort((a, b) =>
    a.isDefault === b.isDefault ? 0 : a.isDefault ? -1 : 1
  );

  const [isAddressFormModalOpen, setIsAddresssFormModalOpen] = useState(false);
  const [activeEditAddress, setActiveEditAddress] = useState<TAddress | null>(
    null
  );

  useEffect(() => {
    dispatch(fetchUserAddress());
  }, []);

  const handleDelete = (addressId: string) => {
    dispatch(deleteAddress(addressId));
  };
  const handleSetDefault = (addressId: string) => {
    dispatch(makeAddressDefault(addressId));
  };

  const handleAddressEditClick = (address: TAddress) => {
    setActiveEditAddress(address);
    setIsAddresssFormModalOpen(true);
  };

  const handleAddressModalClose = () => {
    setIsAddresssFormModalOpen(false);
    setActiveEditAddress(null);
  };

  return (
    <Box>
      {/* Add/edit new Address Modal */}
      <CustomModal
        modalTitle="Add New Address"
        isOpen={isAddressFormModalOpen}
        onClose={handleAddressModalClose}
        component={
          <AddressForm
            handleNext={handleAddressModalClose}
            address={activeEditAddress}
            type={activeEditAddress ? "update" : "create"}
          />
        }
      />

      <Typography variant="h5" gutterBottom>
        Your Addresses
      </Typography>
      <Box
        sx={{
          minWidth: 256,
          marginTop: 2,
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={2} sm={4} md={6} minHeight={200}>
            <Box
              onClick={() => setIsAddresssFormModalOpen(true)}
              sx={{
                border: "2px dotted #ddd",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <AddIcon fontSize={"large"} sx={{ color: "#ddd" }} />
              <Typography variant="h6">Add Address</Typography>
            </Box>
          </Grid>

          {sortedAddress.map((address) => (
            <Grid item xs={2} sm={4} md={6} key={address._id}>
              <Box
                sx={{
                  border: "1px solid #ddd",
                  height: "100%",
                }}
              >
                {address.isDefault && (
                  <Box
                    sx={{
                      borderBottom: "1px solid #ddd",
                      padding: 1,
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Typography variant="caption">Default:</Typography>
                    <CheckIcon color="success" />
                  </Box>
                )}

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

                <Box
                  sx={{
                    padding: 1,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => handleAddressEditClick(address)}
                  >
                    Edit
                  </Button>
                  <Box>|</Box>
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => handleDelete(address._id)}
                  >
                    Remove
                  </Button>
                  {!address.isDefault && (
                    <>
                      <Box>|</Box>
                      <Button
                        variant="text"
                        size="small"
                        onClick={() => handleSetDefault(address._id)}
                      >
                        Set as Default
                      </Button>
                    </>
                  )}
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}

export default Address;
