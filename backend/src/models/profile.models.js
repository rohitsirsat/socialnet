import mongoose, { Schema } from "mongoose";
import { User } from "./user.models.js";

const profileSchema = new Schema(
  {
    coverImage: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: `https://via.placeholder.com/800x450.png`,
        localPath: "",
      },
    },
    firstName: {
      type: String,
      default: "",
    },
    lastName: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    dob: {
      type: Date,
      default: null,
    },
    location: {
      type: String,
      default: "",
    },
    contryCode: {
      type: String,
      default: "",
    },
    phoneNumber: {
      type: String,
      default: "",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const SocialProfile = mongoose.model("SocialProfile", profileSchema);
