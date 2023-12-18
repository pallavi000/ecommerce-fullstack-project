import React, { useEffect, useState } from "react";
// redux
import { useAppDispatch } from "../redux/store";

// MUI
import {
  Box,
  Fab,
  TableCell,
  TableRow,
  Typography,
  Button,
  ButtonGroup,
  Avatar,
} from "@mui/material";

//icons
import Close from "@mui/icons-material/Close";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";

// types
import { TCart } from "../@types/cart";
import { TProduct } from "../@types/product";

// reducers
import { removeFromCart, updateCartItem } from "../redux/reducers/cartReducer";

// helpers
import { showCustomToastr } from "../utils/helper";
import useDebounce from "../hooks/useDebounce";

type CartItemProps = { item: TCart };

function CartItem({ item }: CartItemProps) {
  const [isQuantityUpdating, setIsQuantityUpdating] = useState(false);
  const [isItemRemoving, setIsItemRemoving] = useState(false);
  const [quantity, setQuantity] = useState(item.quantity);
  const debouncedQuantity = useDebounce(quantity, 1000);

  const dispatch = useAppDispatch();

  // Quantity change handler
  const handleQuantityChange = async () => {
    setIsQuantityUpdating(true);
    const data = { quantity };
    await dispatch(updateCartItem({ cartId: item._id, data }));
    setIsQuantityUpdating(false);
  };

  useEffect(() => {
    if (debouncedQuantity && debouncedQuantity !== item.quantity) {
      handleQuantityChange();
    }
  }, [debouncedQuantity]);

  // remove item from cart handler
  const handleRemoveCart = async () => {
    setIsItemRemoving(true);
    await dispatch(removeFromCart(item._id));
    setIsItemRemoving(false);
  };

  return (
    <TableRow key={item.product._id}>
      <TableCell component="th" scope="row">
        <Box display={"flex"} alignItems={"center"}>
          <Avatar
            alt={item.product.name}
            src={item.product.image}
            variant="square"
            sx={{ width: 75, height: 75 }}
          />

          <Box ml={2}>
            <p
              style={{
                fontWeight: "bold",
                fontSize: 16,
                margin: "0 0 8px 0",
              }}
            >
              {item.product.name}
            </p>
            <div
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                width: "20rem",
              }}
            >
              <Typography variant="caption" noWrap>
                {item.product.description}
              </Typography>
            </div>
          </Box>
        </Box>
      </TableCell>
      <TableCell align="center">
        <ButtonGroup size="small" variant="contained" disableElevation>
          <Button
            color="inherit"
            disabled={quantity <= 1 || isQuantityUpdating ? true : false}
            onClick={() => setQuantity((prev) => prev - 1)}
          >
            <Remove fontSize="small" />
          </Button>
          <Button disabled>{quantity}</Button>
          <Button
            color="inherit"
            disabled={quantity >= item.product.stock || isQuantityUpdating}
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            <Add fontSize="small" />
          </Button>
        </ButtonGroup>
      </TableCell>
      <TableCell>${item.product.price}</TableCell>
      <TableCell>${item.product.price * quantity}</TableCell>
      <TableCell>
        <Fab
          onClick={() => handleRemoveCart()}
          size="small"
          color="error"
          disableRipple
          disabled={isItemRemoving}
        >
          <Close />
        </Fab>
      </TableCell>
    </TableRow>
  );
}

export default CartItem;
