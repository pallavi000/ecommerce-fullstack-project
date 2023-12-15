import React from "react";
import { useNavigate } from "react-router-dom";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../../redux/store";

// MUI
import { Avatar, IconButton, Menu, MenuItem } from "@mui/material";

// icons
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

// reducers
import { logoutUser } from "../../../redux/reducers/authReducer";

// routes
import { ROUTES } from "../../../routes/routers";

function AccountPopover() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // user profie/icon click popover handler state
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // auth user state
  const user = useSelector((state: AppState) => state.auth.user);

  // popover click handler
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // logout handler
  const logout = () => {
    handleClose();
    dispatch(logoutUser());
    navigate(ROUTES.HOME);
  };

  return (
    <>
      <IconButton onClick={handleMenu}>
        <Avatar
          sx={{ width: 32, height: 32 }}
          src={user?.avatar}
          alt="photoURL"
        />
      </IconButton>

      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 200,
          },
        }}
      >
        <MenuItem
          onClick={() => {
            navigate(ROUTES.ADMIN_PROFILE);
            handleClose();
          }}
          sx={{ minWidth: 180 }}
        >
          <AccountCircleIcon sx={{ marginRight: "0.5rem" }} /> Profile
        </MenuItem>
        <MenuItem onClick={logout}>
          <LogoutIcon sx={{ marginRight: "0.5rem" }} /> Logout
        </MenuItem>
      </Menu>
    </>
  );
}

export default AccountPopover;
