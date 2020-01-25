import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    siteId: {
      type: String,
      required: true
    },
    language: {
      type: String
    },
    userAgent: {
      type: String
    }
  },
  { timestamps: true }
);
const session = mongoose.model("Session", schema);

export default session;
