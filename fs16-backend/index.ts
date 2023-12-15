import express from "express";
import "dotenv/config";
import cors from "cors";
import passport from "passport";
import path from "path";

// middlewares
import { loggingMiddleware } from "./middlewares/logging";
import { errorLoggingMiddleware } from "./middlewares/error";
import { routeNotFound } from "./middlewares/routeNotFound";
import { loginWithGoogle } from "./middlewares/loginWithGoogle";

// routes
import productsRoute from "./routes/productsRoute";
import categoriesRoute from "./routes/categoriesRoute";
import bannersRoute from "./routes/bannersRote";
import usersRoute from "./routes/usersRoute";
import sizesRoute from "./routes/sizesRoute";
import cartRoute from "./routes/cartRoute";
import orderRoute from "./routes/orderRoute";
import authRoute from "./routes/authRoute";
import addressesRoute from "./routes/addressRoute";
import settingRoute from "./routes/settingRoute";

//db connection
import { connectMongoDB } from "./config/mongoose";

//swagger
import swaggerDocs from "./utils/swagger";

//port
import { PORT } from "./constants/server";

// app config
const app = express();

app.use(passport.initialize());
passport.use(loginWithGoogle());

// DB connect
connectMongoDB();

// middleware connections
app.use(cors());
app.use(express.json());
app.use(loggingMiddleware);

// Serve uploads during development
if (process.env.NODE_ENV === "development") {
  app.use("/uploads", express.static(path.join("./", "uploads")));
}

//swagger docs
swaggerDocs(app, PORT);

// define routes
app.use("/api/v1/products", productsRoute);
app.use("/api/v1/categories", categoriesRoute);
app.use("/api/v1/users", usersRoute);
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/sizes", sizesRoute);
app.use("/api/v1/carts", cartRoute);
app.use("/api/v1/banners", bannersRoute);
app.use("/api/v1/orders", orderRoute);
app.use("/api/v1/addresses", addressesRoute);
app.use("/api/v1/settings", settingRoute);

app.use(errorLoggingMiddleware);
// catch-all route for non-existing routes

app.use("*", routeNotFound);

// run server

export default app;
