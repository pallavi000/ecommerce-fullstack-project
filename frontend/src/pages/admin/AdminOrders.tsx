import React, { useEffect } from "react";
// redux
import { useSelector } from "react-redux";
import { AppState, useAppDispatch } from "../../redux/store";

// MUI
import {
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableFooter,
  TablePagination,
  Typography,
  TextField,
  InputAdornment,
  CardContent,
  Divider,
} from "@mui/material";

// icons
import { Search } from "@mui/icons-material";

// types
import { TOrder } from "../../@types/order";

//components
import OrderTableBody from "../../components/admin/orders/OrderTableBody";
import TableSearchNotFound from "../../components/TableSearchNotFound";

//reducers
import { getOrders } from "../../redux/reducers/orderReducer";

//helpers
import withPermission from "../../context/withPermission";

function AdminOrders() {
  // pagination states
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const dispatch = useAppDispatch();

  // filter states
  const [filterOrderId, setFilterOrderId] = React.useState("");

  // orders states
  const orders: TOrder[] = useSelector((state: AppState) => state.orders.data);

  // handle search by order id
  const handleFilterByOrderId = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPage(0);
    setFilterOrderId(event.target.value);
  };

  // pagination handlers
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // orders state
  useEffect(() => {
    dispatch(getOrders());
  }, []);

  // filter orders
  const filterOrders = orders.filter((u) => u._id.includes(filterOrderId));

  const isNotFound = !filterOrders.length && !!filterOrderId;

  return (
    <Container>
      <Typography variant="h6">Orders</Typography>
      <Divider sx={{ marginTop: 2, marginBottom: 4 }} />
      <Card>
        <CardContent>
          <TextField
            size="small"
            sx={{ ml: 1, flex: 1, margin: "1rem" }}
            placeholder="Search Ordes By ID"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            onChange={handleFilterByOrderId}
          />
          <Container maxWidth="md">
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Items</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Payment Method</TableCell>
                    <TableCell>Delivery Status</TableCell>
                    <TableCell>Total</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filterOrders
                    .slice(page * rowsPerPage, rowsPerPage + page * rowsPerPage)
                    .map((order) => {
                      return <OrderTableBody order={order} key={order._id} />;
                    })}
                </TableBody>

                {isNotFound && <TableSearchNotFound query={filterOrderId} />}

                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[10, 25]}
                      count={filterOrders.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                  </TableRow>
                </TableFooter>
              </Table>
            </TableContainer>
          </Container>
        </CardContent>
      </Card>
    </Container>
  );
}

export default withPermission(AdminOrders, "ORDERS_READ");
