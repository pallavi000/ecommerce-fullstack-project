import React, { useState } from "react";

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
  Box,
} from "@mui/material";

// icons
import { MoreVert } from "@mui/icons-material";

// types
import { TProduct } from "../../../@types/product";

// component props type
type ProductTableBodyProps = {
  product: TProduct;
  selectedProducts: string[];
  handleSelectClick: Function;
  handlePopoverOpen: Function;
};

function ProductTableBody({
  product,
  selectedProducts,
  handleSelectClick,
  handlePopoverOpen,
}: ProductTableBodyProps) {
  // is this table row selected?
  const selectedProduct = selectedProducts.indexOf(product._id) !== -1;
  return (
    <TableRow
      hover
      key={product._id}
      tabIndex={-1}
      role="checkbox"
      selected={selectedProduct}
    >
      <TableCell padding="checkbox">
        <Checkbox
          checked={selectedProduct}
          onChange={(event) => handleSelectClick(event, product._id)}
        />
      </TableCell>
      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar alt={product.name} src={product.image} />
          <Typography variant="body1" noWrap>
            {product.name}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell component={"td"} align="left">
        <Box
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            width: "15rem",
          }}
        >
          <Typography
            variant="caption"
            fontWeight={"400"}
            color={"text.primary"}
            noWrap
          >
            {product.description}
          </Typography>
        </Box>
      </TableCell>
      <TableCell align="left">
        <Chip label={product.stock} size="small" color="primary" />
      </TableCell>
      <TableCell align="left">
        <Chip
          avatar={
            <Avatar alt={product.category.name} src={product.category.image} />
          }
          label={product.category.name}
          variant="outlined"
        />
      </TableCell>
      <TableCell align="left">
        <Chip
          color="warning"
          avatar={<Avatar sx={{ bgcolor: "warning.light" }}>$</Avatar>}
          label={product.price}
        />
      </TableCell>
      <TableCell align="right">
        <IconButton
          size="large"
          color="inherit"
          onClick={(e) => handlePopoverOpen(e, product)}
        >
          <MoreVert />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default ProductTableBody;
