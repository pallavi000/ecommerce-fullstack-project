import React, { useState } from "react";

//mui
import {
  Drawer,
  useTheme,
  Stack,
  Typography,
  Tooltip,
  Box,
  IconButton,
  Divider,
  RadioGroup,
  CardActionArea,
} from "@mui/material";
import BadgeDot from "@mui/icons-material/Badge";
import RefreshRounded from "@mui/icons-material/RefreshRounded";
import Close from "@mui/icons-material/Close";
import DarkMode from "@mui/icons-material/DarkMode";

function SettingsDrawer() {
  const notDefault = true;

  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        BackdropProps={{ invisible: true }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: 2, pr: 1, pl: 2 }}
        >
          <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
            Settings
          </Typography>

          <Tooltip title="Reset">
            <Box sx={{ position: "relative" }}>
              {notDefault && <BadgeDot />}
              <IconButton>
                <RefreshRounded />
              </IconButton>
            </Box>
          </Tooltip>

          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Stack>

        <Divider sx={{ borderStyle: "dashed" }} />

        <Box sx={{ p: 2, pt: 0 }}>
          <RadioGroup name="themeMode" value={"dark"}>
            <Box>
              <CardActionArea>
                <DarkMode />
              </CardActionArea>
            </Box>
          </RadioGroup>
        </Box>
      </Drawer>
    </>
  );
}

export default SettingsDrawer;
