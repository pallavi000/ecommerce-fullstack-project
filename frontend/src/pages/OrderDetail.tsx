import React, { useEffect } from "react";
import { useReactToPrint } from "react-to-print";

import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AppState, useAppDispatch } from "../redux/store";
import { getSingleOrder } from "../redux/reducers/orderReducer";
import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import BreadCrumb from "../components/Breadcrumb";

import PrintIcon from "@mui/icons-material/Print";

function OrderDetail() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { orderId } = useParams();

  const componentRef = React.useRef<HTMLDivElement | null>(null);

  const { isLoading, order } = useSelector((state: AppState) => ({
    isLoading: state.orders.isLoading,
    order: state.orders.order,
  }));

  // redirect if order id doesn't exist in orders
  useEffect(() => {
    if (orderId) {
      dispatch(getSingleOrder(orderId));
    }
  }, [orderId]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <>
      {!isLoading && !order ? (
        <Alert severity="error">
          <AlertTitle>No Order!</AlertTitle>
          No order found with order id — <strong>{orderId}</strong>
        </Alert>
      ) : (
        <Container maxWidth="lg">
          <BreadCrumb label={`Order Details: #${orderId}`} />

          <Box
            sx={{
              marginTop: 4,
              marginRight: 6,
              marginBottom: 4,
              float: "right",
            }}
          >
            <Button
              color="success"
              variant="contained"
              endIcon={<PrintIcon />}
              onClick={handlePrint}
            >
              Print
            </Button>
          </Box>
          <Stack
            marginTop={4}
            ref={componentRef}
            alignItems={"center"}
            sx={{ clear: "both" }}
          >
            <Grid container spacing={4} maxWidth={"95%"}>
              <Grid item md={8} sm={12} xs={12} container spacing={4}>
                <Grid item md={12} sm={12} xs={12}>
                  <Card variant="outlined">
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Products</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell align="right">Subtotal</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {order?.products.map((product) => {
                            return (
                              <TableRow key={product._id}>
                                <TableCell component="th" scope="row">
                                  <Tooltip
                                    sx={{ cursor: "pointer" }}
                                    title={product.name}
                                    onClick={() =>
                                      navigate(`/product-detail/${product._id}`)
                                    }
                                  >
                                    <Stack
                                      direction={"row"}
                                      alignItems={"center"}
                                      gap={2}
                                    >
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
                                      <Typography
                                        variant="body2"
                                        noWrap
                                        maxWidth={300}
                                      >
                                        {product.name}
                                      </Typography>
                                    </Stack>
                                  </Tooltip>
                                </TableCell>
                                <TableCell>1</TableCell>
                                <TableCell>${product.price}</TableCell>
                                <TableCell align="right">
                                  ${product.price}
                                </TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                        <TableFooter>
                          <TableRow>
                            <TableCell colSpan={3}>Subtotal</TableCell>
                            <TableCell align="right">${order?.total}</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={3}>Shipping</TableCell>
                            <TableCell align="right">$0</TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell colSpan={3}>Total</TableCell>
                            <TableCell align="right">
                              <Typography variant="subtitle2">
                                ${order?.total}
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableFooter>
                      </Table>
                    </TableContainer>
                  </Card>
                </Grid>
                <Grid md={12} sm={12} xs={12} item>
                  <Card variant="outlined">
                    <CardHeader title="Shipping Information" />
                    <Divider />
                    <Box marginBottom={2}>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell>Country</TableCell>
                              <TableCell>City</TableCell>
                              <TableCell>Street</TableCell>
                              <TableCell>Zip Code</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            <TableRow>
                              <TableCell>
                                {order?.shipping.address?.fullname}
                              </TableCell>
                              <TableCell>
                                {order?.shipping.address?.country}
                              </TableCell>
                              <TableCell>
                                {order?.shipping.address?.city}
                              </TableCell>
                              <TableCell>
                                {order?.shipping.address?.street}
                              </TableCell>
                              <TableCell>
                                {order?.shipping.address?.zipCode}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Box>
                    <CardHeader title="Billing Information" />
                    <Divider />
                    <TableContainer>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Country</TableCell>
                            <TableCell>City</TableCell>
                            <TableCell>Street</TableCell>
                            <TableCell>Zip Code</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell>
                              {order?.billing.address?.fullname}
                            </TableCell>
                            <TableCell>
                              {order?.billing.address?.country}
                            </TableCell>
                            <TableCell>
                              {order?.billing.address?.city}
                            </TableCell>
                            <TableCell>
                              {order?.billing.address?.street}
                            </TableCell>
                            <TableCell>
                              {order?.billing.address?.zipCode}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Card>
                </Grid>
              </Grid>
              <Grid item md={4} sm={12} xs={12}>
                <Card variant="outlined">
                  <CardHeader title="Order Details" />
                  <Divider />
                  <CardContent>
                    <Stack marginBottom={2}>
                      <Typography variant="subtitle2">
                        Payment Method
                      </Typography>
                      <Typography variant="caption">
                        {order?.payment.method}
                      </Typography>
                    </Stack>
                    <Stack marginBottom={2}>
                      <Typography variant="subtitle2">
                        Payment Status
                      </Typography>
                      <Typography variant="caption">
                        {order?.payment.status}
                      </Typography>
                    </Stack>
                    <Stack marginBottom={2}>
                      <Typography variant="subtitle2">Order Date</Typography>
                      <Typography variant="caption">
                        {new Date(order?.createdAt ?? "").toLocaleString()}
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Stack>
        </Container>
      )}
    </>
  );
}

export default OrderDetail;
