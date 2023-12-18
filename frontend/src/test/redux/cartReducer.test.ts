import { TCart, TCartInput } from "../../@types/cart";
import cartReducer, {
  addToCart,
  removeFromCart,
} from "../../redux/reducers/cartReducer";
import store from "../../redux/store";
import { productsData } from "../testData/productData";
import { userData } from "../testData/userData";

describe("cart reducers", () => {
  // init test
  test("cart init test", () => {
    expect(cartReducer(undefined, { type: undefined })).toEqual({
      items: [],
      totalQuantity: 0,
      totalPrice: 0,
      shippingId: null,
      isLoading: false,
      error: null,
    });
  });
  test("should add item to cart", () => {
    const cartItem: TCartInput = {
      product: productsData[0]._id,
      quantity: 1,
      user: userData[0]._id,
      total: productsData[0].price * 1,
    };
    store.dispatch(addToCart(cartItem));
    expect(store.getState().cart.items[0]).toMatchObject({
      quantity: 1,
      product: productsData[0],
    });
  });

  test("should increase cart value", () => {
    const cartItem = {
      _id: "",
      product: productsData[0],
      quantity: 1,
      user: userData[0]._id,
      total: productsData[0].price * 1,
    };
    //store.dispatch(increaseCartItemQuantity(cartItem));
    expect(store.getState().cart.totalQuantity).toBe(2);
  });

  test("should decrease cart value", () => {
    const cartItem = {
      _id: "",
      product: productsData[0],
      quantity: 1,
      user: userData[0]._id,
      total: productsData[0].price * 1,
    };
    //store.dispatch(decreaseCartItemQuantity(cartItem));
    expect(store.getState().cart.totalQuantity).toBe(1);
  });

  test("should remove item from cart", () => {
    // store.dispatch(removeFromCart(productsData[0]._id));
    // expect(store.getState().cart.totalQuantity).toBe(0);
  });
});
