import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    firstName: {
      type: String
    },
    lastName: {
      type: String
    },
    company: {
      type: String
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false
    },
    sites: [
      {
        domain: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        siteId: {
          type: String,
          required: true
        }
      }
    ]
  },
  { timestamps: true }
);
const user = mongoose.model("User", schema);

export default user;
