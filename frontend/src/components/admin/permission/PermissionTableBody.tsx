// MUI
import {
  Avatar,
  Checkbox,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
  Chip,
} from "@mui/material";

// icons
import { MoreVert } from "@mui/icons-material";

// types
import { TPermission } from "../../../@types/permission";

// component props type
type PermissionTableBodyProps = {
  permission: TPermission;
  handlePopoverOpen: Function;
};

function PermissionTableBody({
  permission,
  handlePopoverOpen,
}: PermissionTableBodyProps) {
  return (
    <>
      <TableRow hover tabIndex={-1} role="checkbox">
        <TableCell component={"td"} align="left">
          <Typography
            variant="caption"
            fontWeight={"400"}
            color={"text.primary"}
          >
            {permission.name}
          </Typography>
        </TableCell>
        <TableCell component={"td"} align="left">
          <Typography
            variant="caption"
            fontWeight={"400"}
            color={"text.primary"}
          >
            {permission.description}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Typography
            variant="caption"
            fontWeight={"400"}
            color={"text.primary"}
          >
            {permission.createdAt}
          </Typography>
        </TableCell>
        <TableCell align="left">
          <Chip size="small" label={permission?.user?.email} />
        </TableCell>
        <TableCell align="right">
          <IconButton
            size="large"
            color="inherit"
            onClick={(e) => handlePopoverOpen(e, permission)}
          >
            <MoreVert />
          </IconButton>
        </TableCell>
      </TableRow>
    </>
  );
}

export default PermissionTableBody;
