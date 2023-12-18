import request from "supertest";

//db-server
import connect, { MongoHelper } from "../db-server";

//app
import app from "../..";

//mock-data
import { loginUserByPermission } from "../mockData/loginUser";
import productData from "../mockData/productData";

// Success test cases
describe("Product Controller - Success Cases", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  test("should create a product", async () => {
    const token = await loginUserByPermission("PRODUCTS_CREATE");
    const response = await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${token}`)
      .send(productData[0]);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(productData[0].name);
  });

  test("should return products with pagination depending on query params", async () => {
    const response = await request(app).get("/api/v1/products").send();
    expect(response.status).toBe(200);
    expect(response.body.totalProducts).toBe(1);
    expect(response.body.currentPage).toBe(1);
    expect(response.body.products).toHaveLength(1);
  });

  test("should return specific product by its id", async () => {
    const { body } = await request(app).get("/api/v1/products").send();
    const { products } = body;
    const response = await request(app)
      .get(`/api/v1/products/${products[0]._id}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(products[0].name);
  });

  test("should search products by title/name", async () => {
    const response = await request(app)
      .get("/api/v1/products/search?title=laptop")
      .send();
    expect(response.status).toBe(200);
  });

  test("should update a product by its id", async () => {
    const token = await loginUserByPermission("PRODUCTS_UPDATE");
    const { body } = await request(app).get("/api/v1/products").send();
    const { products } = body;
    const response = await request(app)
      .put(`/api/v1/products/${products[0]._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...productData[0], name: "Updated Product" });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Updated Product");
  });

  test("should delete a product by its id", async () => {
    const token = await loginUserByPermission("PRODUCTS_DELETE");
    const { body } = await request(app).get("/api/v1/products").send();
    const { products } = body;
    const response = await request(app)
      .delete(`/api/v1/products/${products[0]._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toBe(204);
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });
});

// Failure test cases
describe("Product Controller - Failure Cases", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  test("should handle the case while creating product if no auth is presented", async () => {
    const response = await request(app)
      .post("/api/v1/products")
      .send(productData[0]);
    expect(response.status).toBe(401);
  });

  test("should handle the case while creating order if there is not enough permission", async () => {
    const token = await loginUserByPermission("PRODUCTS_DELETE");
    const response = await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${token}`)
      .send(productData[0]);
    expect(response.status).toBe(403);
  });

  test("should handle the case when invalid id is sent", async () => {
    const response = await request(app)
      .put(`/api/v1/products/1`)
      .send({ ...productData[0], name: "Updated Product" });
    expect(response.status).toBe(400);
  });

  test("should handle the case when invalid post data(schema) is sent", async () => {
    const token = await loginUserByPermission(
      "PRODUCTS_UPDATE",
      "PRODUCTS_CREATE"
    );
    const { body: product } = await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${token}`)
      .send(productData[0]);

    const response = await request(app)
      .put(`/api/v1/products/${product._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({});
    expect(response.status).toBe(400);
  });

  it("should handle the case if user doesn't have enough permission", async () => {
    const token = await loginUserByPermission("PRODUCTS_CREATE");
    const { body: product } = await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${token}`)
      .send(productData[0]);

    const response = await request(app)
      .delete(`/api/v1/products/${product._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toBe(403);
  });
});
