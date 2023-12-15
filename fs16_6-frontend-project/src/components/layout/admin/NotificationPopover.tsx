import { useState } from "react";

// MUI
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from "@mui/material";

// icons
import NotificationsIcon from "@mui/icons-material/Notifications";
import { AccessTime } from "@mui/icons-material";

// helpers
import { getNowDate } from "../../../utils/helper";

// type
type TNotificationItem = {
  createdAt: string;
  id: string;
  isUnRead: boolean;
  title: string;
  description: string;
  type: string;
  avatar: any;
};

// dummy data
const NOTIFICATIONS: TNotificationItem[] = [
  {
    id: "1",
    title: "New order is placed",
    description: "waiting for shipping",
    avatar: null,
    type: "order_placed",
    createdAt: getNowDate(),
    isUnRead: true,
  },
];

export default function NotificationsPopover() {
  // notifications
  const [notifications, setNotifications] = useState(NOTIFICATIONS);
  const totalUnRead = notifications.filter(
    (item) => item.isUnRead === true
  ).length;

  // popover open state
  const [open, setOpen] = useState(null);

  // hanlders
  const handleOpen = (event: any) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>
      <IconButton
        color={open ? "primary" : "default"}
        onClick={handleOpen}
        sx={{ width: 48, height: 48 }}
      >
        <Badge badgeContent={totalUnRead} color="error">
          <NotificationsIcon />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 350,
          },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              You have {totalUnRead} unread messages
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ borderStyle: "dashed" }} />

        <List
          disablePadding
          subheader={
            <ListSubheader
              disableSticky
              sx={{ py: 1, px: 2.5, typography: "overline" }}
            >
              New
            </ListSubheader>
          }
        >
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
            />
          ))}
        </List>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box sx={{ p: 1 }}>
          <Button fullWidth disableRipple>
            View All
          </Button>
        </Box>
      </Popover>
    </>
  );
}

function NotificationItem({
  notification,
}: {
  notification: TNotificationItem;
}) {
  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: "1px",
      }}
    >
      <ListItemAvatar>
        <Avatar>{notification.avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={notification.title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              color: "text.disabled",
            }}
          >
            <AccessTime fontSize="small" sx={{ marginRight: "0.5rem" }} />
            {notification.createdAt}
          </Typography>
        }
      />
    </ListItemButton>
  );
}
