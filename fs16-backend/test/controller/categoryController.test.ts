import request from "supertest";

//db-server
import connect, { MongoHelper } from "../db-server";

//app
import app from "../..";

//mock-data
import categoryData from "../mockData/categoryData";
import { loginUserByPermission } from "../mockData/loginUser";

// Success test cases
describe("Category Controller - Success Cases", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  test("should create a category", async () => {
    const token = await loginUserByPermission("CATEGORIES_CREATE");
    const response = await request(app)
      .post("/api/v1/categories")
      .set("Authorization", `Bearer ${token}`)
      .send(categoryData[0]);
    expect(response.status).toBe(201);
  });

  test("should return all the categories", async () => {
    const response = await request(app).get("/api/v1/categories").send();
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test("should return a specific category by ID", async () => {
    const { body: categories } = await request(app)
      .get("/api/v1/categories")
      .send();
    const response = await request(app)
      .get(`/api/v1/categories/${categories[0]._id}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.body).toEqual(categories[0]);
  });

  test("should update an existing category", async () => {
    const token = await loginUserByPermission("CATEGORIES_UPDATE");
    const { body: categories } = await request(app)
      .get("/api/v1/categories")
      .send();
    const response = await request(app)
      .put(`/api/v1/categories/${categories[0]._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated Category" });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Updated Category");
  });

  test("should delete a category by its id", async () => {
    const token = await loginUserByPermission("CATEGORIES_DELETE");
    const { body: categories } = await request(app)
      .get(`/api/v1/categories`)
      .send();
    const response = await request(app)
      .delete(`/api/v1/categories/${categories[0]._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toBe(204);
  });
});

// Failure test cases
describe("Category Controller - Failure Cases", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  test("should handle the case while creating a category when no auth header is sent", async () => {
    const response = await request(app)
      .post("/api/v1/categories")
      .send(categoryData[0]);
    expect(response.status).toBe(401);
  });

  test("should handle the case when invalid post data(schema) is sent", async () => {
    const token = await loginUserByPermission("CATEGORIES_CREATE");
    const response = await request(app)
      .post("/api/v1/categories")
      .set("Authorization", `Bearer ${token}`)
      .send({});
    expect(response.status).toBe(400);
  });

  test("should handle the case when invalid category id is sent", async () => {
    const response = await request(app).get(`/api/v1/categories/1`).send();
    expect(response.status).toBe(400);
  });

  test("should handle the case when a user doesn't have enough permission", async () => {
    const token = await loginUserByPermission("PRODUCTS_DELETE");
    const response = await request(app)
      .delete(`/api/v1/categories/654cc82bda327008036fb97c`)
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toBe(403);
  });
});
