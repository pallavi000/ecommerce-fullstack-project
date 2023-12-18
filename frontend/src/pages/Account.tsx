import { NavLink, useNavigate, useParams } from "react-router-dom";

// MUI
import {
  Card,
  Container,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

// icons
import UserIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AddressIcon from "@mui/icons-material/LocationOn";
import PasswordIcon from "@mui/icons-material/Password";

// components
import UserProfile from "../components/account/UserProfile";
import Orders from "../components/account/Orders";
import Address from "../components/account/Address";
import ChangePassword from "../components/account/ChangePassword";

const sidebars = [
  { label: "Account", icon: <UserIcon />, to: "/account/profile" },
  { label: "Address", icon: <AddressIcon />, to: "/account/address" },
  { label: "Orders", icon: <ShoppingCartIcon />, to: "/account/orders" },
  {
    label: "Change Password",
    icon: <PasswordIcon />,
    to: "/account/change-password",
  },
];

type TPage = "orders" | "address" | "profile" | "change-password";

function Account() {
  const navigate = useNavigate();

  const { page } = useParams() as { page: TPage };

  return (
    <Container>
      <Grid container spacing={4}>
        <Grid item sm={12} md={4} sx={{ width: "100%" }}>
          <Card>
            <List disablePadding>
              {sidebars.map((sidebar) => {
                return (
                  <ListItemButton
                    key={sidebar.label}
                    component={NavLink}
                    to={sidebar.to}
                    sx={{
                      position: "relative",
                      textTransform: "capitalize",
                      color: "text.secondary",
                      "&.active": {
                        color: "text.primary",
                        bgcolor: "action.selected",
                        fontWeight: "bold",
                      },
                    }}
                  >
                    <ListItemIcon>{sidebar.icon}</ListItemIcon>
                    <ListItemText primary={sidebar.label} />
                  </ListItemButton>
                );
              })}
            </List>
          </Card>
        </Grid>
        <Grid item sm={12} md={8} width={"100%"}>
          {page === "orders" ? (
            <Orders />
          ) : page === "address" ? (
            <Address />
          ) : page === "change-password" ? (
            <ChangePassword />
          ) : (
            <UserProfile />
          )}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Account;
