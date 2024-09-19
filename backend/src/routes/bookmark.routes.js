import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewares.js";
import { bookmarkUnBookmarkPost } from "../controllers/bookmark.controllers.js";
import { validate } from "../validators/validate.js";
import { getBookMarkedPosts } from "../controllers/post.controllers.js";
import { mongoIdPathVariableValidator } from "../validators/common/mongodb.validators.js";

const router = Router();

router.use(verifyJWT);

router.route("/").get(getBookMarkedPosts); // getBookMarkedPosts controller is present in posts controller due to utility function dependency

router
  .route("/:postId")
  .post(
    mongoIdPathVariableValidator("postId"),
    validate,
    bookmarkUnBookmarkPost
  );

export default router;
