import request from "supertest";

//db-server
import connect, { MongoHelper } from "../db-server";

//app
import app from "../..";

//data
import { loginData, registerData } from "../mockData/authData";

// Success test cases
describe("Auth Controller - Success Cases", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  test("should register user", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(registerData);
    expect(response.status).toBe(201);
    expect(response.body.user).toBeDefined();
    expect(response.body.accessToken).toBeDefined();
  });

  test("should login user", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send(loginData);
    expect(response.status).toBe(200);
    expect(response.body.accessToken).toBeDefined();
  });

  test("should return current user's profile using access token", async () => {
    const { body: loginResponseBody } = await request(app)
      .post("/api/v1/auth/login")
      .send(loginData);
    const response = await request(app)
      .get("/api/v1/auth/profile")
      .set("Authorization", `Bearer ${loginResponseBody.accessToken}`)
      .send();
    expect(response.status).toBe(200);
    expect(response.body.email).toBe(loginData.email);
  });
});

// Failure test cases
describe("Auth Controller - Failure Cases", () => {
  let mongoHelper: MongoHelper;

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  test("should handle the case when invalid post data(schema) is sent", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({});
    expect(response.status).toBe(400);
  });

  test("should handle the case while login when a user is not found by non registered email", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ ...loginData, email: "incorrect@mail.com" });
    expect(response.status).toBe(400);
  });

  test("should handle the case when incorrect password is provided", async () => {
    await request(app).post("/api/v1/auth/register").send(registerData);
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({ ...loginData, password: "wrongPassword" });
    expect(response.status).toBe(400);
  });

  test("should handle the case when no auth is sent", async () => {
    const response = await request(app).get("/api/v1/auth/profile").send();
    expect(response.status).toBe(401);
  });
});
