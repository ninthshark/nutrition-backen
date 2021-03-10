const mongoose = require("mongoose");
// const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    items: {},
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
