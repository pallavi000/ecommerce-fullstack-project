import request from "supertest";

//db-server
import connect, { MongoHelper } from "../db-server";

//app
import app from "../..";

//mock-data
import { loginUserByPermission } from "../mockData/loginUser";
import { registerData } from "../mockData/authData";
import permissionsData from "../mockData/permissionsData";

// Success test cases
describe("User Controller - Success Cases", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  test("should create a user", async () => {
    const token = await loginUserByPermission("USERS_CREATE");
    const response = await request(app)
      .post("/api/v1/users")
      .set("Authorization", `Bearer ${token}`)
      .send(registerData);
    expect(response.status).toBe(201);
  });

  test("should return all the users", async () => {
    const token = await loginUserByPermission("USERS_READ");
    const response = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });

  test("should return specific user by its id", async () => {
    const token = await loginUserByPermission("USERS_READ");
    const { body: users } = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${token}`)
      .send();
    const response = await request(app)
      .get(`/api/v1/users/${users[0]._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.body.email).toEqual(users[0].email);
  });

  test("should update a user", async () => {
    const token = await loginUserByPermission("USERS_UPDATE", "USERS_READ");
    const { body: users } = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${token}`)
      .send();
    const response = await request(app)
      .put(`/api/v1/users/${users[0]._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ ...registerData, firstName: "Updated FirstName" });
    expect(response.status).toBe(200);
    expect(response.body.firstName).toBe("Updated FirstName");
  });

  test("should delete a user by its id", async () => {
    const token = await loginUserByPermission("USERS_DELETE", "USERS_READ");
    const { body: users } = await request(app)
      .get(`/api/v1/users`)
      .set("Authorization", `Bearer ${token}`)
      .send();
    const response = await request(app)
      .delete(`/api/v1/users/${users[0]._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toBe(204);
  });

  test("should create a permission", async () => {
    const token = await loginUserByPermission("PERMISSIONS_CREATE");
    const response = await request(app)
      .post("/api/v1/users/permissions")
      .set("Authorization", `Bearer ${token}`)
      .send(permissionsData.PRODUCT.PRODUCTS_CREATE);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(
      permissionsData.PRODUCT.PRODUCTS_CREATE.name
    );
  });

  test("should retrun all the permissions", async () => {
    const token = await loginUserByPermission("PERMISSIONS_READ");
    const response = await request(app)
      .get("/api/v1/users/permissions")
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  });
});

// Failure test cases
describe("User Controller - Failure Cases", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  test("should handle the case when no auth is presented", async () => {
    const response = await request(app)
      .post("/api/v1/users")
      .send(registerData);
    expect(response.status).toBe(401);
  });

  test("should handle the case when invalid post data(schema) is sent", async () => {
    const token = await loginUserByPermission("USERS_CREATE");
    const response = await request(app)
      .post("/api/v1/users")
      .set("Authorization", `Bearer ${token}`)
      .send({});
    expect(response.status).toBe(400);
  });

  test("should handle the case when invalid id is sent", async () => {
    const token = await loginUserByPermission("USERS_READ");
    const response = await request(app)
      .get(`/api/v1/users/1`)
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toBe(400);
  });

  test("should handle the case when user doesn't have enough permission", async () => {
    const token = await loginUserByPermission("USERS_UPDATE");
    const response = await request(app)
      .delete(`/api/v1/users/654cc82bda327008036fb97c`)
      .set("Authorization", `Bearer ${token}`)
      .send();
    expect(response.status).toBe(403);
  });
});
