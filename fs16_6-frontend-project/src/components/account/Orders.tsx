import React, { useEffect } from "react";
//redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";

// MUI
import {
  Alert,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

// components
import OrderItem from "./OrderItem";

// types
import { TOrder } from "../../@types/order";
import { getOrders } from "../../redux/reducers/orderReducer";

function Orders() {
  const dispatch = useAppDispatch();

  const { orders, isLoading } = useSelector((state: AppState) => ({
    orders: state.orders.data,
    isLoading: state.orders.isLoading,
  }));

  // orders state
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Order ID</TableCell>
              <TableCell>Items</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Method</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Subtotal</TableCell>
              <TableCell>Order Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order: TOrder) => {
              return <OrderItem key={order._id} order={order} />;
            })}
          </TableBody>
          {isLoading && !orders.length && (
            <TableBody>
              <TableRow>
                <TableCell align="center" colSpan={8} sx={{ py: 3 }}>
                  <LinearProgress />
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>
    </>
  );
}

export default Orders;
