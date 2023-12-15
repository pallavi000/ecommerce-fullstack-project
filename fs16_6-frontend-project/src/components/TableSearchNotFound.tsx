import React from "react";

//mui
import { TableBody, TableCell, TableRow, Typography } from "@mui/material";

function TableSearchNotFound({ query }: { query: string }) {
  return (
    <TableBody>
      <TableRow>
        <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
          <Typography variant="h6" paragraph>
            Not found
          </Typography>

          <Typography variant="body2">
            No results found for &nbsp;
            <strong>&quot;{query}&quot;</strong>.
            <br /> Try checking for the size name.
          </Typography>
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

export default TableSearchNotFound;
