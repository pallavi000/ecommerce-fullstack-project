import mongoose from "mongoose";

//db-server
import connect, { MongoHelper } from "../db-server";

//service
import OrderService from "../../services/orderService";
import ProductService from "../../services/productService";
import UserService from "../../services/userService";
import SizeService from "../../services/sizeService";
import CategoryService from "../../services/categoryService";

//mock-data
import productData from "../mockData/productData";
import orderData from "../mockData/orderData";
import { registerData } from "../mockData/authData";

// Success test cases
describe("Order Service - Success Cases", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
    await SizeService.findAll();
    await CategoryService.findAll();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  test("should create an order", async () => {
    // create product
    const product = await ProductService.createOne(productData[0]);
    const user = await UserService.createUser(registerData);
    const response = await OrderService.createOne(
      user._id,
      [product._id],
      orderData
    );
    expect(response.products[0]).toBe(product._id);
  });

  test("should find orders based on params", async () => {
    const response = await OrderService.findAll(10, 1, "-_id");
    expect(response.length).toEqual(1);
  });

  test("should get order by its id", async () => {
    const orders = await OrderService.findAll(10, 1, "-_id");
    const response = await OrderService.findById(orders[0]._id);
    expect(response?.total).toBe(orders[0].total);
  });

  test("should filter order by payment status", async () => {
    const response = await OrderService.filterOrderByStatus(
      10,
      1,
      "-_id",
      "Paid"
    );
    expect(response.length).toBe(1);
  });
});

//Failure test cases
describe("Product Services - Failure Cases", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  test("should not find a order for a non-existent order ID", async () => {
    const nonExistentProductId = new mongoose.Types.ObjectId();
    const foundProduct = await OrderService.findById(nonExistentProductId);
    expect(foundProduct).toBeNull();
  });
});
