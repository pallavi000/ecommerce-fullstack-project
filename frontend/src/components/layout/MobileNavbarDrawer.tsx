import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

// MUI
import {
  Box,
  Toolbar,
  Typography,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Drawer,
} from "@mui/material";

// icons
import SearchIcon from "@mui/icons-material/Search";
import StoreIcon from "@mui/icons-material/Store";
import MenuIcon from "@mui/icons-material/Menu";

// components
import ThemeModeSwitch from "../ThemeModeSwitch";

// types
import { TCategory } from "../../@types/category";

// utils
import { MOBILE_DRAWER_WIDTH } from "../../utils/constants";

interface MobileNavbarDrawerProps {
  window?: () => Window;
  categories: TCategory[];
  handleSearchQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: Function;
}

function MobileNavbarDrawer(props: MobileNavbarDrawerProps) {
  const { window, categories, handleSearch, handleSearchQueryChange } = props;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: MOBILE_DRAWER_WIDTH },
        flexShrink: { sm: 0 },
        display: { md: "none" },
      }}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: "none" } }}
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: MOBILE_DRAWER_WIDTH,
          },
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
            }}
          >
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
              }}
            >
              <StoreIcon fontSize={"large"} color="primary" />
              <Typography variant="h6" color={"primary"} sx={{ my: 2 }}>
                Logo
              </Typography>
            </Link>
            <ThemeModeSwitch />
          </Box>
          <Divider />
          <OutlinedInput
            required
            id="outlined-required"
            size="small"
            sx={{ background: "default", m: 2 }}
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
          <List>
            {categories.map((category) => (
              <ListItem key={category._id} disablePadding>
                <ListItemButton
                  LinkComponent={Link}
                  sx={{ textAlign: "center" }}
                  onClick={() => navigate(`/category/${category._id}/products`)}
                >
                  <ListItemText primary={category.name} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}

export default MobileNavbarDrawer;
