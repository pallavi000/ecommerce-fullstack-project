// redux
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/store";

// MUI
import {
  Avatar,
  Box,
  Drawer,
  Link,
  List,
  Typography,
  useMediaQuery,
} from "@mui/material";

// icons
import {
  AccountCircle,
  Category,
  Dashboard,
  Money,
  ShoppingBag,
  DeveloperMode,
  Straighten,
  Settings,
} from "@mui/icons-material";

// components
import SideBarItem from "./SideBarItem";

// types
import { SidebarItem } from "../../../@types/sidebar";

// context
import { useThemeContext } from "../../../context/ThemeContext";

// utils
import { ADMIN_SIDEBAR_WIDTH } from "../../../utils/constants";

// sidebar menus
const sidebarItems: SidebarItem[] = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <Dashboard />,
    permission: "DASHBOARD_READ",
  },
  {
    title: "Users",
    path: "/admin/users",
    icon: <AccountCircle />,
    permission: "USERS_READ",
  },
  {
    title: "Permissions",
    path: "/admin/permissions",
    icon: <DeveloperMode />,
    permission: "PERMISSIONS_READ",
  },
  {
    title: "Banners",
    path: "/admin/banners",
    icon: <Category />,
    permission: "BANNERS_READ",
  },
  {
    title: "Categories",
    path: "/admin/categories",
    icon: <Category />,
    permission: "CATEGORIES_READ",
  },
  {
    title: "Products",
    path: "/admin/products",
    icon: <ShoppingBag />,
    permission: "PRODUCTS_READ",
  },
  {
    title: "Sizes",
    path: "/admin/sizes",
    icon: <Straighten />,
    permission: "SIZES_READ",
  },
  {
    title: "Orders",
    path: "/admin/orders",
    icon: <Money />,
    permission: "ORDERS_READ",
  },
  {
    title: "Settings",
    path: "/admin/settings",
    icon: <Settings />,
    permission: "SETTINGS_READ",
  },
];

// component props type
type SideBarProps = {
  isOpen: boolean;
  handleClose: Function;
};

function SideBar({ isOpen, handleClose }: SideBarProps) {
  const { theme } = useThemeContext();

  // auth user state
  const user = useSelector((state: AppState) => state.auth.user);
  const setting = useSelector((state: AppState) => state.setting.data);

  // sidebar content
  const renderContent = (
    <Box
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          px: 2.5,
          py: 3,
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
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
            <Typography variant="caption">{setting?.websiteTagline}</Typography>
          ) : null}
        </Box>
      </Box>

      <Box sx={{ mb: 3, mx: 2.5 }}>
        <Link underline="none">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              padding: "0.8rem 2rem",
              borderRadius: 1.5,
              backgroundColor: "action.selected",
            }}
          >
            <Avatar src={user?.avatar} alt="photoURL" />

            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: "text.primary" }}>
                {user?.firstName} {user?.lastName}
              </Typography>

              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {user?.role}
              </Typography>
            </Box>
          </Box>
        </Link>
      </Box>

      <Box>
        <List disablePadding sx={{ p: 1 }}>
          {sidebarItems.map((item) => (
            <SideBarItem key={item.path} item={item} />
          ))}
        </List>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
    </Box>
  );

  const isDesktop = useMediaQuery(theme.breakpoints.up("lg"));

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: ADMIN_SIDEBAR_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: ADMIN_SIDEBAR_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          variant="temporary"
          open={isOpen}
          onClose={() => handleClose()}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: ADMIN_SIDEBAR_WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

export default SideBar;
