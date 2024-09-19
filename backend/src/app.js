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
import userRouter from "./routes/user.routes.js";
import socialBookmarkRouter from "./routes/bookmark.routes.js";
import socialCommentRouter from "./routes/comment.routes.js";
import socialFollowRouter from "./routes/follow.routes.js";
import socialLikeRouter from "./routes/like.routes.js";
import socialPostRouter from "./routes/post.routes.js";
import socialProfileRouter from "./routes/profile.routes.js";

app.use("/api/v1/users", userRouter);

app.use("/api/v1/social-media/profile", socialProfileRouter);
app.use("/api/v1/social-media/follow", socialFollowRouter);
app.use("/api/v1/social-media/posts", socialPostRouter);
app.use("/api/v1/social-media/like", socialLikeRouter);
app.use("/api/v1/social-media/bookmarks", socialBookmarkRouter);
app.use("/api/v1/social-media/comments", socialCommentRouter);

export { app };
