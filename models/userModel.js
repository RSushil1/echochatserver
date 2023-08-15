import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    bio: {
      type: String
    },
    coverPhoto: {
      data: Buffer,
      contentType: String,
    },
    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("users", userSchema);
