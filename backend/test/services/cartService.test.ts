import mongoose from "mongoose";

//service
import CartService from "../../services/cartService";
import UserService from "../../services/userService";
import SizeService from "../../services/sizeService";
import ProductService from "../../services/productService";
import CategoryService from "../../services/categoryService";

//db-server
import connect, { MongoHelper } from "../db-server";

//mock-data
import cartData from "../mockData/cartData";
import { loginUserByPermission } from "../mockData/loginUser";
import usersData from "../mockData/usersData";
import productData from "../mockData/productData";

// Success test cases
describe("Cart Services - Success Cases", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
    await ProductService.createOne(productData[0]);
    await UserService.findAllUser();
    await SizeService.findAll();
    await CategoryService.findAll();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  test("should add a product to cart", async () => {
    const response = await CartService.addToCart(usersData[0]._id, cartData[0]);
    expect(response.quantity).toBe(1);
  });

  test("should return all the cart items", async () => {
    const response = await CartService.findAll();
    expect(response.length).toBe(1);
  });

  test("should increase cart quantity", async () => {
    const newCart = await CartService.addToCart(usersData[0]._id, cartData[0]);
    const response = await CartService.updateCartQuantity(
      newCart._id,
      newCart.quantity + 1,
      100
    );
    expect(response?.quantity).toBe(2);
  });

  test("should delete a cart by its id", async () => {
    const newCart = await CartService.addToCart(usersData[0]._id, cartData[0]);
    const response = await CartService.deleteCartById(newCart._id);
    expect(response).toBeDefined();
    const deletedProduct = await CartService.findSingleCart(newCart._id);
    expect(deletedProduct).toBeNull();
  });
});

// Failure test cases
describe("Cart Services - Failure Cases", () => {
  let mongoHelper: MongoHelper;
  let token: string;

  beforeAll(async () => {
    mongoHelper = await connect();
    token = await loginUserByPermission();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  test("should not find a cart for a non-existent cart ID", async () => {
    const nonExistentCartId = new mongoose.Types.ObjectId();
    const foundProduct = await CartService.findSingleCart(nonExistentCartId);
    expect(foundProduct).toBeNull();
  });
});
