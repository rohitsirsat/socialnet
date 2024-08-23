import mongoose, { Schema } from "mongoose";
import { User } from "./user.models.js";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const followSchema = new Schema(
  {
    // the one who follows
    followerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    // the one who is being followed
    followeeId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

followSchema.plugin(mongooseAggregatePaginate);

export const SocialFollow = mongoose.model("SocialFollow", followSchema);
