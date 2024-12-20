import mongoose, { Schema } from "mongoose";
import { User } from "./user.models.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const postSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
      index: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    images: {
      type: [{ url: String, localPath: String }],
      default: [],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

postSchema.plugin(mongooseAggregatePaginate);
export const SocialPost = mongoose.model("SocialPost", postSchema);

/**
 * @description (Tags)
 * This field stores hashtags or keywords associated with the post. It allows users to categorize their posts with relevant tags, making it easier to search for related content.

 */
