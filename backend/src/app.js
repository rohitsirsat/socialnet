import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morganMiddleware from "./logger/morgan.logger.js";
import cookieParser from "cookie-parser";

const app = express();

dotenv.config({
  path: "./.env",
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

/* user gonna send data in differint format || for that 
we use this middlewares (limit) extended ==> object ke andar object etc
*/

//  when deta came through form
app.use(express.json({ limit: "16kb" }));

// when data in came through url
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// this for when we want to store files like img, pdf , fevicon ==>> store in (public) folder
app.use(express.static("public"));

// to set and get access of cookies from user's browser
app.use(cookieParser());
app.use(morganMiddleware);

// import routes
import { userRouter } from "./controllers/user.controllers.js";

app.use("/api/v1/users", userRouter);

export { app };
