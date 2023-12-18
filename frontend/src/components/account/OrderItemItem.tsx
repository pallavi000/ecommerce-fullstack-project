import React from "react";
import { Link } from "react-router-dom";

// MUI
import { TableCell, TableRow, Box, Chip, Tooltip } from "@mui/material";

// types
import { TOrder } from "../../@types/order";
import { TProduct } from "../../@types/product";

// component props type
type OrderItemItemProps = {
  order: TOrder;
  product: TProduct;
};

function OrderItemItem({ order, product }: OrderItemItemProps) {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        <Tooltip title={product.name}>
          <Link to={`/product-detail/${product._id}`}>
            <Box width={40} height={40}>
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
                alt={product.name}
                src={product.image}
              />
            </Box>
          </Link>
        </Tooltip>
      </TableCell>
      <TableCell>{new Date(order.createdAt || "").toLocaleString()}</TableCell>
      <TableCell align="center">{order.payment.method}</TableCell>
      <TableCell>${product.price}</TableCell>
      <TableCell>{1}</TableCell>
      <TableCell>${product.price * 1}</TableCell>
      <TableCell>
        <Chip size="small" label={order.payment.status} color="primary" />
      </TableCell>
    </TableRow>
  );
}

export default OrderItemItem;
