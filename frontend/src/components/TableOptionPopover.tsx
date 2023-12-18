import React, { useEffect } from "react";

// MUI
import { MenuItem, Popover, Typography } from "@mui/material";

// icons
import { Delete, Edit } from "@mui/icons-material";
import { showCustomToastr } from "../utils/helper";

// component props type
type TableOptionPopoverProps = {
  isLoading?: boolean;
  anchorEl: (EventTarget & HTMLButtonElement) | null;
  handleEdit: Function;
  handleDelete: Function;
  handleCloseMenu: Function;
  showEdit?: boolean;
  showDelete?: boolean;
};

function TableOptionPopover({
  isLoading = false,
  anchorEl,
  handleEdit,
  handleDelete,
  handleCloseMenu,
  showEdit = true,
  showDelete = true,
}: TableOptionPopoverProps) {
  useEffect(() => {
    if (!showEdit && !showDelete && anchorEl) {
      showCustomToastr("No option available", "error");
    }
  }, [showEdit, showDelete, anchorEl]);

  if (!showEdit && !showDelete) return null;

  return (
    <Popover
      open={Boolean(anchorEl)}
      anchorEl={anchorEl}
      onClose={() => handleCloseMenu()}
      anchorOrigin={{ vertical: "top", horizontal: "left" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          p: 1,
          width: 140,
          "& .MuiMenuItem-root": {
            px: 1,
            typography: "body2",
            borderRadius: 0.75,
          },
        },
      }}
    >
      {showEdit ? (
        <MenuItem disabled={isLoading} onClick={() => handleEdit()}>
          <Edit color="action" fontSize="small" />
          <Typography
            variant="caption"
            fontWeight={"normal"}
            color={"text.primary"}
            sx={{
              marginLeft: "1rem",
            }}
          >
            Edit
          </Typography>
        </MenuItem>
      ) : null}

      {showDelete ? (
        <MenuItem
          disabled={isLoading}
          sx={{ color: "error.main" }}
          onClick={() => handleDelete()}
        >
          <Delete color="error" fontSize="small" />
          <Typography
            variant="caption"
            color={"error"}
            fontWeight={"normal"}
            sx={{
              marginLeft: "1rem",
            }}
          >
            Delete
          </Typography>
        </MenuItem>
      ) : null}
    </Popover>
  );
}

export default TableOptionPopover;
