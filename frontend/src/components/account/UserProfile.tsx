import React, { useRef, useState } from "react";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";

// MUI
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

//components
import CustomModal from "../CustomModal";
import ProfileUpdate from "../ProfileUpdate";
import { MuiFileInput } from "mui-file-input";
import { updateAvatar } from "../../redux/reducers/authReducer";
import CustomFileUpload from "../CustomFileUpload";

function UserProfile() {
  const dispatch = useAppDispatch();
  const inputRef = useRef<HTMLInputElement | null>(null);
  // auth state
  const user = useSelector((state: AppState) => state.auth.user);

  // modal control states
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleAvatarChange = (file: File | null) => {
    if (file) {
      const data = new FormData();
      data.append("avatar", file);
      dispatch(updateAvatar(data));
    }
  };

  return (
    <Card
      sx={{
        minWidth: 256,
        textAlign: "center",
      }}
    >
      <CardContent>
        <Tooltip title="Click to change">
          <Box>
            <CustomFileUpload
              handleFileChange={handleAvatarChange}
              mimeType="image/*"
              buttonComponent={
                <Avatar
                  sx={{ width: 60, height: 60, margin: "auto" }}
                  src={user?.avatar}
                />
              }
            />
          </Box>
        </Tooltip>
        <h3
          style={{
            fontSize: 18,
            fontWeight: "bold",
            letterSpacing: "0.5px",
            marginTop: 8,
            marginBottom: 0,
          }}
        >
          {user?.firstName} {user?.lastName}
        </h3>
      </CardContent>
      <Typography variant="h6" sx={{ textAlign: "left", padding: "0rem 3rem" }}>
        Personal Details
      </Typography>
      <Divider light sx={{ margin: "0.5rem 0rem" }} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: "0.3rem",
          margin: "2rem",
          marginTop: "0.5rem",
          justifyContent: "flex-end",
          alignItems: "flex-start",
          textAlign: "left",
          padding: "1rem",
          gap: "1rem",
        }}
      >
        <Box>
          <Typography
            sx={{ fontSize: "14px", color: "text.primary", fontWeight: "500" }}
          >
            Full Name
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "text.secondary",
              fontWeight: "500",
            }}
          >
            {user?.firstName} {user?.lastName}
          </Typography>
        </Box>
        <Box>
          <Typography
            sx={{ fontSize: "14px", color: "text.primary", fontWeight: "500" }}
          >
            Email
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "text.secondary",
              fontWeight: "500",
            }}
          >
            {user?.email}
          </Typography>
        </Box>

        <Box>
          <Typography
            sx={{ fontSize: "14px", color: "text.primary", fontWeight: "500" }}
          >
            Role
          </Typography>
          <Typography
            sx={{
              fontSize: "14px",
              color: "text.secondary",
              fontWeight: "500",
            }}
          >
            {user?.role}
          </Typography>
        </Box>
        <Button variant="contained" onClick={() => setIsModalOpen(true)}>
          Update Profile
        </Button>

        <CustomModal
          isOpen={isModalOpen}
          modalTitle="Update Profile"
          onClose={() => handleModalClose()}
          component={
            <ProfileUpdate handleClose={() => setIsModalOpen(false)} />
          }
        />
      </Box>
    </Card>
  );
}

export default UserProfile;
