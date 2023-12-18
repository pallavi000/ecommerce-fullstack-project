import GoogleTokenStrategy from "passport-google-id-token";
import "dotenv/config";

//types
import { TUserSchema } from "users";

//error builder
import { ApiError } from "../errors/ApiError";

//services
import UserService from "../services/userService";

//constant
import { ROLE } from "../constants/roles";

export const loginWithGoogle = () => {
  return new GoogleTokenStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID as string,
    },
    async function (parsedToken, googleId, done) {
      const googleUser = parsedToken.payload;
      try {
        let user = await UserService.findByEmail(googleUser.email);
        if (!user) {
          const userData: TUserSchema = {
            firstName: googleUser.given_name,
            lastName: googleUser.family_name,
            email: googleUser.email,
            password: googleId, // Password is required in User model. so we've to provide something to create user
            role: ROLE.USER,
          };
          user = await UserService.createUser(userData);
        }
        done(false, user);
      } catch (error) {
        return done(ApiError.forbidden("google authentication failed"));
      }
    }
  );
};
