import React from "react";

// MUI
import { TableCell, TableRow, Typography, Chip, Box } from "@mui/material";

// types
import { TOrder } from "../../../@types/order";

// component props type
type OrderTableBodyProps = {
  order: TOrder;
};

function OrderTableBody({ order }: OrderTableBodyProps) {
  return (
    <TableRow>
      <TableCell component="th" scope="row">
        {order.products.map((product) => {
          return (
            <Box
              key={`${order._id}-${product._id}`}
              display={"flex"}
              alignItems={"center"}
              sx={{ marginBottom: "0.5rem" }}
              gap={"0.5rem"}
            >
              <Box width={32} height={32}>
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
              <div
                style={{
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  width: "20rem",
                }}
              >
                <Typography
                  variant="caption"
                  color={"text.primary"}
                  fontSize={14}
                  noWrap
                >
                  {product.name}
                </Typography>
              </div>
            </Box>
          );
        })}
      </TableCell>
      <TableCell>
        <Typography variant="caption" fontWeight={"400"} color={"text.primary"}>
          {order.createdAt}
        </Typography>
      </TableCell>
      <TableCell>
        <Typography variant="caption" fontWeight={"400"} color={"text.primary"}>
          {order.payment.method}
        </Typography>
      </TableCell>
      <TableCell>
        <Chip color="success" size="small" label={`${order.payment.status}`} />
      </TableCell>
      <TableCell>${order.total}</TableCell>
    </TableRow>
  );
}

export default OrderTableBody;
