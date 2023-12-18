import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";

// MUI
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Badge,
  InputAdornment,
  Menu,
  MenuItem,
  OutlinedInput,
  Tooltip,
  Stack,
  Fab,
  useTheme,
} from "@mui/material";

// icons
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  FavoriteBorder,
  LocationOn,
  ShoppingBag,
  ShoppingBagOutlined,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";

// types
import { TUser } from "../../@types/user";

// reducers
import { logoutUser } from "../../redux/reducers/authReducer";
import { fetchCategories } from "../../redux/reducers/categoriesReducer";

// routes
import { ROUTES } from "../../routes/routers";

// helpers
import { showCustomToastr } from "../../utils/helper";

// components
import ThemeModeSwitch from "../ThemeModeSwitch";
import MobileNavbarDrawer from "./MobileNavbarDrawer";

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const theme = useTheme();

  // user profile icon click popover state
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  // search state
  const [searchQuery, setSearchQuery] = useState("");

  // auth states
  const { user }: { user: TUser | null } = useSelector((state: AppState) => ({
    user: state.auth.user,
  }));

  // cart state
  const cartItem = useSelector((state: AppState) => state.cart);

  // categories
  const categories = useSelector((state: AppState) => state.categories.data);

  const setting = useSelector((state: AppState) => state.setting.data);

  // fetch categories
  React.useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  // handle user profile/icon click popover
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

  // search
  const handleSearchQueryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchQuery(e.target.value);
  };

  const handleSearch = () => {
    if (searchQuery?.trim().length < 3) {
      return showCustomToastr(
        "Search query length must of at least of 3 characters.",
        "error"
      );
    }
    navigate(`/search/?query=${searchQuery}`);
  };

  return (
    <>
      <AppBar
        position="sticky"
        color={"primary"}
        elevation={0}
        sx={{
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
          padding: "0.2rem 0rem",
          backgroundColor: "background.default",
          color: "text.primary",
          marginBottom: 4,
        }}
      >
        <Toolbar
          sx={{
            flexWrap: "wrap",
            display: "flex",
            gap: "2rem",
          }}
        >
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: "2rem",
              alignItems: "center",
            }}
          >
            <Link
              to="/"
              style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
            >
              <Avatar
                alt={setting?.websiteName}
                src={
                  theme.palette.mode === "dark"
                    ? setting?.logoDarkUrl
                    : setting?.logoUrl
                }
                variant={"square"}
                sx={{ width: 48, height: 48 }}
              />
              <Box>
                <Typography variant="h6" color={"primary"}>
                  {setting?.websiteName}
                </Typography>
                {setting?.websiteTagline ? (
                  <Typography variant="caption">
                    {setting?.websiteTagline}
                  </Typography>
                ) : null}
              </Box>
            </Link>
            {categories.slice(0, 5).map((category) => {
              return (
                <Link
                  color="text.primary"
                  to={`/category/${category._id}/products`}
                  key={category._id}
                >
                  <Typography variant="body1" fontWeight={"500"}>
                    {category.name}
                  </Typography>
                </Link>
              );
            })}
          </Box>

          <Box
            component={"nav"}
            sx={{
              display: "flex",
              gap: "1.5rem",
              alignItems: "center",
              justifyContent: "space-between",
              flexGrow: 1,
            }}
          >
            <MobileNavbarDrawer
              categories={categories}
              handleSearch={handleSearch}
              handleSearchQueryChange={handleSearchQueryChange}
            />

            <Box
              sx={{
                gap: "1.5rem",
                alignItems: "center",
                justifyContent: "flex-end",
                display: { xs: "none", md: "flex" },
                flexGrow: 1,
              }}
            >
              <OutlinedInput
                required
                id="outlined-required"
                size="small"
                sx={{ background: "default" }}
                placeholder="Search for products..."
                onChange={handleSearchQueryChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <SearchIcon onClick={() => handleSearch()} />
                    </IconButton>
                  </InputAdornment>
                }
              />
              <ThemeModeSwitch />
            </Box>

            {user ? (
              <Box
                sx={{ display: "flex", gap: "0.5rem", alignItems: "center" }}
              >
                <IconButton disabled>
                  <FavoriteBorder />
                </IconButton>

                <Button>
                  <Stack direction={"row"} gap={1} alignItems={"center"}>
                    <Avatar
                      src="https://tailwindui.com/img/flags/flag-united-states.svg"
                      alt="currency"
                      sx={{ width: 20, height: 20 }}
                    />
                    <Typography variant="button">USD</Typography>
                  </Stack>
                </Button>

                <IconButton onClick={() => navigate(ROUTES.CART)}>
                  <Badge badgeContent={cartItem.items.length} color="success">
                    <ShoppingBagOutlined />
                  </Badge>
                </IconButton>

                <Tooltip title={user.firstName}>
                  <IconButton onClick={handleMenu}>
                    <Avatar
                      alt={user.firstName}
                      src={user.avatar}
                      sx={{ width: 32, height: 32 }}
                    />
                  </IconButton>
                </Tooltip>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  PaperProps={{
                    sx: {
                      mt: 2.2,
                      ml: 0.75,
                      width: 200,
                    },
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      navigate("/account/profile");
                    }}
                    sx={{ minWidth: 180 }}
                  >
                    <AccountCircleIcon sx={{ marginRight: "0.5rem" }} /> Profile
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      navigate("/account/address");
                    }}
                    sx={{ minWidth: 180 }}
                  >
                    <LocationOn sx={{ marginRight: "0.5rem" }} /> Address
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      navigate("/account/orders");
                    }}
                    sx={{ minWidth: 180 }}
                  >
                    <ShoppingBag sx={{ marginRight: "0.5rem" }} /> Orders
                  </MenuItem>
                  <MenuItem onClick={logout}>
                    <LogoutIcon sx={{ marginRight: "0.5rem" }} /> Logout
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box
                sx={{ display: "flex", gap: "1.5rem", alignItems: "center" }}
              >
                <Link to={ROUTES.SIGN_IN}>
                  <Button variant="contained">Login</Button>
                </Link>
                <Link to={ROUTES.REGISTER}>
                  <Button variant="outlined">Register</Button>
                </Link>
              </Box>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
}
