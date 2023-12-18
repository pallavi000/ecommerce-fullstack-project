import request from "supertest";

//db-server
import connect, { MongoHelper } from "../db-server";

//app
import app from "../..";

//mock-data
import { loginUserByPermission } from "../mockData/loginUser";
import sizeData from "../mockData/sizeData";

// Success test cases
describe("Size Controller - Success Cases", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  test("should create a size", async () => {
    const token = await loginUserByPermission("SIZES_CREATE");
    const response = await request(app)
      .post("/api/v1/sizes")
      .set("Authorization", `Bearer ${token}`)
      .send(sizeData[0]);
    expect(response.status).toBe(201);
  });

  test("should return all the sizes", async () => {
    const token = await loginUserByPermission("SIZES_READ");
    const response = await request(app)
      .get("/api/v1/sizes")
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test("should reurn a specific size by its id", async () => {
    const token = await loginUserByPermission("SIZES_READ");
    const { body: sizes } = await request(app)
      .get("/api/v1/sizes")
      .set("Authorization", `Bearer ${token}`)
      .send();
    const response = await request(app)
      .get(`/api/v1/sizes/${sizes[0]._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.body).toEqual(sizes[0]);
  });

  test("should update a size by its id", async () => {
    const token = await loginUserByPermission("SIZES_UPDATE", "SIZES_READ");
    const { body: sizes } = await request(app)
      .get("/api/v1/sizes")
      .set("Authorization", `Bearer ${token}`)
      .send();
    const response = await request(app)
      .put(`/api/v1/sizes/${sizes[0]._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Updated size" });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Updated size");
  });

  test("should delete a size by its id", async () => {
    const token = await loginUserByPermission("SIZES_DELETE", "SIZES_READ");
    const { body: sizes } = await request(app)
      .get(`/api/v1/sizes`)
      .set("Authorization", `Bearer ${token}`)
      .send();
    const response = await request(app)
      .delete(`/api/v1/sizes/${sizes[0]._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toBe(204);
  });
});

// Failure test cases
describe("size Controller - Failure Cases", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  test("should handle the case while creating size if no auth is sent", async () => {
    const response = await request(app).post("/api/v1/sizes").send(sizeData[0]);
    expect(response.status).toBe(401);
  });

  test("should handle the case when invalid post data(schema) is sent", async () => {
    const token = await loginUserByPermission("SIZES_CREATE");
    const response = await request(app)
      .post("/api/v1/sizes")
      .set("Authorization", `Bearer ${token}`)
      .send({});
    expect(response.status).toBe(400);
  });

  test("should handle the case if invalid id is sent", async () => {
    const response = await request(app).get(`/api/v1/sizes/1`).send();
    expect(response.status).toBe(400);
  });

  test("should handle the case if user doesn't have enough permission", async () => {
    const token = await loginUserByPermission("PRODUCTS_DELETE");
    const response = await request(app)
      .delete(`/api/v1/sizes/654cc82bda327008036fb97c`)
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toBe(403);
  });
});
