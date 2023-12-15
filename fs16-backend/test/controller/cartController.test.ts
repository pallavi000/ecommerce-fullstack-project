import request from "supertest";

//db-server
import connect, { MongoHelper } from "../db-server";

//app
import app from "../..";

//mock-data
import cartData from "../mockData/cartData";
import { loginUserByPermission } from "../mockData/loginUser";
import productData from "../mockData/productData";

// Success test cases
describe("Cart Controller - Success Cases", () => {
  let mongoHelper: MongoHelper;
  let token: string;
  let product: any;

  beforeAll(async () => {
    mongoHelper = await connect();
    token = await loginUserByPermission("PRODUCTS_CREATE");
    const response = await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${token}`)
      .send(productData[0]);
    product = response.body;
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  test("should return all the user's cart items", async () => {
    const response = await request(app)
      .get("/api/v1/carts")
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toBe(200);
  });

  test("should create cart", async () => {
    const response = await request(app)
      .post("/api/v1/carts")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...cartData[0], product: product._id });
    expect(response.status).toBe(201);
  });

  test("should increase cart quantity", async () => {
    const response = await request(app)
      .post("/api/v1/carts")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...cartData[0], product: product._id });
    expect(response.status).toBe(200);
    expect(response.body.quantity).toBe(2);
  });

  test("should delete the cart by its id", async () => {
    const { body: cartItems } = await request(app)
      .get("/api/v1/carts")
      .set("Authorization", `Bearer ${token}`)
      .send();
    const response = await request(app)
      .delete(`/api/v1/carts/${cartItems[0]._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toBe(204);
  });
});

// Failure test cases
describe("Cart Controller - Failure Cases", () => {
  let mongoHelper: MongoHelper;
  let token: string;

  beforeAll(async () => {
    mongoHelper = await connect();
    token = await loginUserByPermission();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  test("should handle the case when no auth is provided", async () => {
    const response = await request(app).get("/api/v1/carts").send();
    expect(response.status).toBe(401);
  });

  test("should handle the case when invalid post data(schema) is sent", async () => {
    const response = await request(app)
      .post("/api/v1/carts")
      .set("Authorization", `Bearer ${token}`)
      .send({});
    expect(response.status).toBe(400);
  });

  test("should handle the case when adding a non existing product to cart", async () => {
    const response = await request(app)
      .post("/api/v1/carts")
      .set("Authorization", `Bearer ${token}`)
      .send(cartData[0]);
    expect(response.status).toBe(404);
  });

  test("should handle the case when invalid params is sent", async () => {
    const response = await request(app)
      .delete(`/api/v1/carts/1`)
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toBe(400);
  });
});
