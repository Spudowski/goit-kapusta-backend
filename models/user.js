import mongoose from "mongoose";
import bCrypt from "bcrypt";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    token: {
      type: String,
      default: null,
    },
  },
  { versionKey: false, timestamps: true }
);

userSchema.methods.setPassword = async function (password) {
  this.password = await bCrypt.hash(password, 10);
};

userSchema.methods.validatePassword = async function (password) {
  return await bCrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;