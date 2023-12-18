import jsonwebtoken from "jsonwebtoken";

//service
import AuthService from "../../services/authService";

//db-server
import connect, { MongoHelper } from "../db-server";

//constant
import { ROLE } from "../../constants/roles";
import { ACCESS_TOKEN_SECRET } from "../../constants/auth";

describe("Auth service", () => {
  let mongoHelper: MongoHelper;
  const mockUser = {
    _id: "6557d2530fe86fe5c201e7d5",
    email: "admin@admin.com",
    password: "12345678",
    firstName: "admin",
    lastName: "admin",
    role: ROLE.ADMIN,
    avatar: "https://images.com/admin.png",
    permission: ["USERS_READ"],
  };

  beforeAll(async () => {
    mongoHelper = await connect();
  });

  afterAll(async () => {
    await mongoHelper.closeDatabase();
  });

  it("should generate an access token with valid user data", async () => {
    const accessToken = await AuthService.generateAccessToken(mockUser);

    expect(typeof accessToken).toBe("string");

    const decodedToken = jsonwebtoken.decode(accessToken) as Record<
      string,
      any
    >;

    expect(decodedToken).toBeDefined();
    expect(decodedToken._id).toEqual(mockUser._id);
    expect(decodedToken.email).toEqual(mockUser.email);
    expect(decodedToken.role).toEqual(mockUser.role);
    expect(decodedToken.permission).toEqual(mockUser.permission);
    expect(decodedToken.exp).toBeGreaterThan(Math.floor(Date.now() / 1000));
  });

  it("should generate a refresh token with valid user data", async () => {
    const refreshToken = await AuthService.generateRefreshToken(mockUser);

    expect(typeof refreshToken).toBe("string");

    const decodedToken = jsonwebtoken.decode(refreshToken) as Record<
      string,
      any
    >;

    expect(decodedToken).toBeDefined();
    expect(decodedToken._id).toEqual(mockUser._id);
    expect(decodedToken.email).toEqual(mockUser.email);
    expect(decodedToken.role).toEqual(mockUser.role);
    expect(decodedToken.permission).toEqual(mockUser.permission);
  });

  it("should return the payload for a valid token", () => {
    const validToken = jsonwebtoken.sign(mockUser, ACCESS_TOKEN_SECRET);

    const result = AuthService.verifyToken(validToken, ACCESS_TOKEN_SECRET);

    expect(result).not.toBeNull();
    expect(result).toEqual(expect.objectContaining(mockUser));
  });
});
